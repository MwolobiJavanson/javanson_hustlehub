import { useState } from "react";
import { Link } from "react-router-dom";

const faqList = [
  {
    q: "What is Fixmtaa?",
    a: "Fixmtaa is a Kenyan recruitment platform that connects jobseekers, employers, and service providers through simple job search, posting, and support tools.",
  },
  {
    q: "What is the mission of Fixmtaa?",
    a: "Fixmtaa's mission is to empower East African professionals by making job discovery, applications, hiring, and local opportunity access more transparent and easier to use.",
  },
  {
    q: "What is the vision of Fixmtaa?",
    a: "Fixmtaa's vision is to become a trusted career partner across the region, where hiring is secure, accessible, data-informed, and fair for jobseekers and employers.",
  },
  {
    q: "What are the mission and vision of Fixmtaa?",
    a: "Fixmtaa's mission is to simplify access to work and hiring opportunities. Its vision is to become a trusted regional career platform that connects talent and employers through secure, transparent, and accessible tools.",
  },
  {
    q: "How do I sign up?",
    a: "Use the Sign Up page to create your account with a valid email, phone number, username, and password.",
  },
  {
    q: "How do I log in?",
    a: "Go to the Login page and enter the email and password you registered with.",
  },
  {
    q: "How do I post a job?",
    a: "Use the Post Job page after logging in, then fill in the title, description, location, salary, job type, and optional image.",
  },
  {
    q: "How do I apply for a job?",
    a: "Browse jobs on the Jobs page and click the Apply button on the job you want.",
  },
  {
    q: "What payment method is supported?",
    a: "Fixmtaa supports M-Pesa for job posting payments and related verification flows.",
  },
  {
    q: "What does the dashboard show?",
    a: "The dashboard summarizes applications, saved jobs, profile strength, recent activity, and quick actions.",
  },
  {
    q: "What are services?",
    a: "Services are additional support offerings or local tasks listed separately from job postings.",
  },
  {
    q: "How do I contact support?",
    a: "Open the Contact page to reach support through WhatsApp, email, SMS, phone call, or the contact form.",
  },
  {
    q: "What are skills used for?",
    a: "Skills help employers understand your strengths and match you with relevant opportunities.",
  },
  {
    q: "What does Fixmtaa mean?",
    a: "Fixmtaa is a local-style name that points to finding work, support, or opportunity in the community.",
  },
  {
    q: "Hi?",
    a: "Hi. Welcome to Fixmtaa. How can I help you?",
  },
  {
    q: "Who are you?",
    a: "Hey. Am the FixmtaaBot. What can i help you with.",
  },
];

const quickQuestions = [
  "What is Fixmtaa?",
  "What is the mission of Fixmtaa?",
  "What is the vision of Fixmtaa?",
  "How do I post a job?",
  "How do I apply for a job?",
  "How do I contact support?",
];

function AboutComponent() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! Am the Fixmtaa bot. Ask me anything about Fixmtaa, including the mission, vision, signup, jobs, services, payments.",
    },
  ]);

  const getTokenSet = (text) =>
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, " ")
        .split(/\s+/)
        .filter(Boolean),
    );

  const findBestAnswer = (question) => {
    const normalized = question.trim().toLowerCase();
    if (!normalized) {
      return "Please type a question about Fixmtaa, jobs, services, mission, vision, or support.";
    }

    const exact = faqList.find((item) => item.q.toLowerCase() === normalized);
    if (exact) return exact.a;

    const questionTokens = getTokenSet(normalized);
    const scored = faqList
      .map((item) => {
        const itemTokens = getTokenSet(item.q);
        const score = [...questionTokens].filter((token) =>
          itemTokens.has(token),
        ).length;
        return { item, score };
      })
      .sort((a, b) => b.score - a.score);

    return scored[0].score > 0
      ? scored[0].item.a
      : "I can answer common Fixmtaa questions about mission, vision, signup, jobs, services, payments, or support. Try asking 'What is the mission of Fixmtaa?'";
  };

  const askQuestion = (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: trimmed },
      { sender: "bot", text: findBestAnswer(trimmed) },
    ]);
    setChatInput("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    askQuestion(chatInput);
  };

  return (
    <div className="container my-5">
      <div className="text-center py-5 bg-light rounded-5 shadow-sm mb-5 px-3">
        <span className="badge bg-success mb-3 px-3 py-2 rounded-pill">
          Since 2024
        </span>
        <h1 className="display-4 fw-bold text-dark mb-3">
          The Future of <span className="text-success">Hiring in Kenya</span>
        </h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: 700 }}>
          We have removed the complexity from job search and hiring by creating
          a direct, secure connection between local talent and employers.
        </p>
        <div className="mt-4 d-flex flex-wrap justify-content-center gap-2">
          <Link
            className="btn btn-success btn-lg px-5 fw-bold shadow-sm"
            to="/jobs"
          >
            Browse Jobs
          </Link>
          <Link
            className="btn btn-outline-dark btn-lg px-5 fw-bold"
            to="/post_job"
          >
            Post a Job
          </Link>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card h-100 border-start border-success border-4 shadow-sm p-4 text-center">
            <h2 className="fw-bold text-success mb-1">10,000+</h2>
            <p className="text-muted mb-0 fw-medium">Qualified Candidates</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-start border-primary border-4 shadow-sm p-4 text-center">
            <h2 className="fw-bold text-primary mb-1">500+</h2>
            <p className="text-muted mb-0 fw-medium">Verified Employers</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 border-start border-warning border-4 shadow-sm p-4 text-center">
            <h2 className="fw-bold text-warning mb-1">24/7</h2>
            <p className="text-muted mb-0 fw-medium">Active Support</p>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-5 p-4 mb-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-2 mb-4">
          <div>
            <h2 className="fw-bold mb-1">Fixmtaa Chat Helper</h2>
            <p className="text-muted mb-0">
              Ask about the mission, vision, jobs, services, accounts, payments,
              or support.
            </p>
          </div>
          <span className="badge bg-success py-2 px-3">FAQs</span>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div
              className="bg-light rounded-4 p-3 mb-3"
              style={{ minHeight: 360, maxHeight: 420, overflowY: "auto" }}
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.sender}-${index}`}
                  className={`mb-3 ${message.sender === "bot" ? "text-start" : "text-end"}`}
                >
                  <div
                    className={`d-inline-block px-3 py-2 rounded-4 ${
                      message.sender === "bot"
                        ? "bg-white text-dark"
                        : "bg-primary text-white"
                    }`}
                    style={{ maxWidth: "92%" }}
                  >
                    <small className="d-block text-muted mb-1">
                      {message.sender === "bot" ? "Fixmtaa Bot" : "You"}
                    </small>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control rounded-start-4"
                  placeholder="Ask a question about Fixmtaa..."
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                />
                <button className="btn btn-success rounded-end-4" type="submit">
                  Send
                </button>
              </div>
              <p className="small text-muted mb-0">
                Try: "What are the mission and vision of Fixmtaa?"
              </p>
            </form>
          </div>

          <div className="col-lg-4">
            <div className="bg-white border rounded-4 p-3 h-100">
              <h5 className="fw-bold mb-3">Quick Questions</h5>
              <div className="d-grid gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    className="btn btn-outline-secondary text-start rounded-4"
                    onClick={() => askQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark text-white rounded-5 p-5 shadow-lg">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Use Fixmtaa?</h2>
          <p className="text-success fw-bold text-uppercase small">
            The Digital Advantage
          </p>
        </div>
        <div className="row g-4">
          <div className="col-md-4 text-center">
            <div
              className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: 80, height: 80 }}
            >
              <span className="fw-bold fs-4 text-success">Pay</span>
            </div>
            <h5 className="fw-bold">Seamless M-Pesa</h5>
            <p className="small text-secondary">
              Instant fee processing and smoother job posting workflows.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <div
              className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: 80, height: 80 }}
            >
              <span className="fw-bold fs-4 text-success">Find</span>
            </div>
            <h5 className="fw-bold">Smart Search</h5>
            <p className="small text-secondary">
              Browse relevant roles with filtering, sorting, and clear job
              details.
            </p>
          </div>
          <div className="col-md-4 text-center">
            <div
              className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: 80, height: 80 }}
            >
              <span className="fw-bold fs-4 text-success">Go</span>
            </div>
            <h5 className="fw-bold">Mobile First</h5>
            <p className="small text-secondary">
              Responsive screens help users apply, post, and manage activity on
              the move.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutComponent;
