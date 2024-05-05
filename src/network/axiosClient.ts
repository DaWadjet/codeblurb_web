import { refresh } from "@/network/auth";
import useTokenStore from "@/store/tokenStore";
import { RefreshTokenResponse } from "@/types/exportedApiTypes";
import axios, { AxiosRequestHeaders } from "axios";

import createAuthRefreshInterceptor from "axios-auth-refresh";

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const setTokens = (tokens: RefreshTokenResponse) => {
  useTokenStore.getState().setAccessToken(tokens.accessToken!);
  useTokenStore.getState().setAccessToken(tokens.refreshToken!);
};

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use((request) => {
  const accessToken = useTokenStore.getState().access;
  if (!accessToken) return request;
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${accessToken}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${accessToken}`,
    } as AxiosRequestHeaders;
  }
  return request;
});

createAuthRefreshInterceptor(AxiosInstance, async () => {
  try {
    const response = await refresh(useTokenStore.getState().refresh!);

    if (response.status === 401) {
      useTokenStore.getState().logout();
      return;
    }

    const data = response.data;
    setTokens(data);
  } catch (error) {
    useTokenStore.getState().logout();
  }
});

export default AxiosInstance;
