import { refresh } from "@/network/auth";
import axios from "axios";

const baseUrl = "https://api.bence.kovacs.host/";
const client = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(async (req) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      const tokens = await refresh(refreshToken);
      localStorage.setItem("accessToken", tokens.accessToken ?? "");
      localStorage.setItem("refreshToken", tokens.refreshToken ?? "");

      return client(originalConfig);
    }

    return Promise.reject(error);
  }
);

export default client;
