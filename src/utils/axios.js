// src/utils/axios.js
import axios from "axios";
import { SwalLoading, SwalClose, SwalRetry } from "@/utils/swal";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/* ===============================
   REQUEST
================================ */
api.interceptors.request.use((config) => {
  if (!config.skipLoading) {
    SwalLoading();
  }
  return config;
});

/* ===============================
   RESPONSE
================================ */
api.interceptors.response.use(
  (response) => {
    SwalClose();
    return response;
  },
  async (error) => {
    SwalClose();

    const status = error.response?.status;
    const url = error.config?.url || "";

    //////////////////////////////////////////////////////
    // SILENT /auth/me
    //////////////////////////////////////////////////////
    if (status === 401 && url.includes("/auth/me")) {
      return Promise.resolve({ data: null });
    }

    //////////////////////////////////////////////////////
    // GLOBAL 401 (session expired)
    //////////////////////////////////////////////////////
    if (status === 401 && !url.includes("/auth/login")) {
      window.location.href = "/login";
      return Promise.reject(error);
    }

    //////////////////////////////////////////////////////
    // SERVER ERROR RETRY
    //////////////////////////////////////////////////////
    if (status >= 500) {
      await SwalRetry({
        text: "เซิร์ฟเวอร์มีปัญหา ต้องการลองใหม่หรือไม่ ?",
        onRetry: () => window.location.reload(),
      });
    }

    return Promise.reject(error);
  }
);

export default api;