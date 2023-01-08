import axios from "axios";

const instance = axios.create({
  // API URL
  baseURL: "http://127.0.0.1:5001/clone-e03a3/us-central1/api",
});

export default instance;
