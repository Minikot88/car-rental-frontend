// src/services/api.js
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api", // เชื่อม Express backend
});
