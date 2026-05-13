import axios from "axios";

const API_BASE = "https://jmwolobi.alwaysdata.net";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    // default headers; multipart will be set by browser/axios when FormData is used
    Accept: "application/json",
  },
  // do not send cookies by default
  withCredentials: false,
});

export { api, API_BASE };
