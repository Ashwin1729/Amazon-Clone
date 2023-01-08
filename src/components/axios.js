import axios from "axios";

const instance = axios.create({
  // API URL
  baseURL: "",
});

export default instance;
