import * as tf from "@tensorflow/tfjs";

// Simple default TF.js scorer (no training/weights upload).
// It produces recommendation scores from user inputs + job/service text.

const textHash01 = (text) => {
  const s = String(text || "").toLowerCase();
  if (!s) return 0;
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) % 100000;
  }
  return (h % 1000) / 1000; // 0..0.999
};

const clamp01 = (x) => Math.max(0, Math.min(1, x));

const availabilityTo01 = (availability) => {
  const v = String(availability || "").toLowerCase();
  if (v.includes("week")) return 0.7;
  if (v.includes("month")) return 0.4;
  if (v.includes("any") || v.includes("immediate") || v.includes("now")) return 0.95;
  if (v.includes("part") || v.includes("weekend")) return 0.6;
  if (v.includes("full") || v.includes("full-time") || v.includes("daily")) return 0.85;
  const n = Number(v);
  if (!Number.isNaN(n)) return clamp01(n);
  return 0.5;
};

const salaryTo01 = (salary) => {
  const n = Number(String(salary || "").replace(/[^0-9.]/g, ""));
  if (Number.isNaN(n)) return 0.5;
  // Rough normalization for KES scale (tunable)
  return clamp01(n / 150000);
};

const jobTextTo01 = (job) => {
  const title = job?.title || job?.name || "";
  const desc = job?.description || "";
  return clamp01(textHash01(title) * 0.6 + textHash01(desc) * 0.4);
};

const serviceTextTo01 = (service) => {
  const title = service?.title || service?.name || "";
  const desc = service?.description || "";
  return clamp01(textHash01(title) * 0.6 + textHash01(desc) * 0.4);
};

const jobSalaryTo01 = (job) => {
  const s = job?.salary ?? job?.price ?? null;
  const n = Number(s);
  if (Number.isNaN(n)) return 0.5;
  return clamp01(n / 150000);
};

// Deterministic small network: 7 inputs -> 8 relu -> 1 sigmoid
// We choose random-but-fixed weights via a manual seed by building variables with constant values.
const makeModel = () => {
  const model = tf.sequential();
  model.add(
    tf.layers.dense({
      units: 8,
      inputShape: [7],
      activation: "relu",
      useBias: true,
      kernelInitializer: {
        apply: () => tf.tensor2d(kernelVals(), [7, 8], "float32"),
      },
      biasInitializer: {
        apply: () => tf.tensor1d(biasVals(), "float32"),
      },
    })
  );
  model.add(
    tf.layers.dense({
      units: 1,
      activation: "sigmoid",
      useBias: true,
      kernelInitializer: {
        apply: () => tf.tensor2d(kernel2Vals(), [8, 1], "float32"),
      },
      biasInitializer: {
        apply: () => tf.tensor1d(bias2Vals(), "float32"),
      },
    })
  );
  return model;
};

const kernelVals = () => {
  // length 7*8=56
  return [
    0.42, -0.15, 0.09, 0.31, -0.22, 0.18, 0.07, 0.25,
    -0.12, 0.27, 0.14, -0.08, 0.33, -0.19, 0.11, 0.04,
    0.21, 0.06, -0.26, 0.12, 0.08, 0.24, -0.09, -0.02,
    0.05, 0.17, 0.29, -0.24, 0.13, -0.07, 0.22, 0.01,
    -0.28, 0.10, 0.04, 0.18, -0.05, 0.26, -0.16, 0.12,
    0.07, -0.11, 0.19, 0.25, -0.20, 0.03, 0.16, -0.06,
    0.24, 0.02, -0.13, 0.09, 0.27, -0.01, 0.06, -0.22,
  ];
};
const biasVals = () => [0.03, -0.02, 0.05, 0.01, -0.04, 0.02, 0.00, 0.04];
const kernel2Vals = () => {
  // length 8
  return [
    0.35,
    -0.18,
    0.22,
    0.10,
    -0.25,
    0.14,
    0.06,
    -0.08,
  ].flatMap((x) => [x]);
};
const bias2Vals = () => [0.02];

let _model;
const getModel = async () => {
  if (_model) return _model;
  _model = makeModel();
  return _model;
};

const buildUserVector = ({ age, pastJob, serviceDone, availability, expectedSalary }) => {
  const ageN = clamp01(Number(age) / 60); // 0..1 (rough)
  const pastJobN = textHash01(pastJob);
  const serviceDoneN = textHash01(serviceDone);
  const availabilityN = availabilityTo01(availability);
  const expectedSalaryN = salaryTo01(expectedSalary);
  // Extra engineered feature: match between past job and service done
  const combo = clamp01(pastJobN * 0.5 + serviceDoneN * 0.5);

  // 7 inputs total; add two more stable-ish features
  const stability = clamp01(0.6 * ageN + 0.4 * availabilityN);
  const motivation = clamp01(0.7 * expectedSalaryN + 0.3 * combo);

  return [ageN, pastJobN, serviceDoneN, availabilityN, expectedSalaryN, stability, motivation];
};

// Score candidates (jobs or services) and return top N
export async function recommendJobsAndServices({
  age,
  pastJob,
  serviceDone,
  availability,
  expectedSalary,
  jobs = [],
  services = [],
  topN = 3,
}) {
  const model = await getModel();

  const userVec = buildUserVector({ age, pastJob, serviceDone, availability, expectedSalary });
  const userT = tf.tensor2d([userVec], [1, 7], "float32");

  const recommendFrom = async (items, type) => {
    const scores = [];
    for (const item of items) {
      // Build candidate-specific vector of 7 inputs by mixing user vector with candidate signals.
      const textN = type === "job" ? jobTextTo01(item) : serviceTextTo01(item);
      const salaryN = type === "job" ? jobSalaryTo01(item) : salaryTo01(item?.price || item?.salary);

      // Candidate injection strategy:
      // - replace some slots with candidate text/salary, keep the rest from user
      const vec = [
        userVec[0], // age
        (userVec[1] * 0.6 + textN * 0.4),
        (userVec[2] * 0.6 + textN * 0.4),
        userVec[3], // availability
        (userVec[4] * 0.5 + salaryN * 0.5),
        (userVec[5] * 0.7 + textN * 0.3),
        (userVec[6] * 0.7 + salaryN * 0.3),
      ];

      const pred = tf.tidy(() => {
        const x = tf.tensor2d([vec], [1, 7], "float32");
        const y = model.predict(x);
        return y.dataSync()[0];
      });

      scores.push({ item, score: pred });
    }

    scores.sort((a, b) => b.score - a.score);
    return scores.slice(0, topN);
  };

  const jobRec = await recommendFrom(Array.isArray(jobs) ? jobs : [], "job");
  const serviceRec = await recommendFrom(Array.isArray(services) ? services : [], "service");

  userT.dispose();
  return {
    jobRecommendations: jobRec.map((x) => ({ ...x.item, score: x.score })),
    serviceRecommendations: serviceRec.map((x) => ({ ...x.item, score: x.score })),
  };
}

