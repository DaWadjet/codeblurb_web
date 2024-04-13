import useTokenStore from "@/store/tokenStore";
import { TTokens } from "@/utils/types";
import axios, { AxiosRequestHeaders } from "axios";

import createAuthRefreshInterceptor, {
  AxiosAuthRefreshRequestConfig,
} from "axios-auth-refresh";

const baseUrl = "https://api.bence.kovacs.host/";

const setTokens = (tokens: TTokens) => {
  useTokenStore.getState().setAccessToken(tokens.accessToken);
  useTokenStore.getState().setAccessToken(tokens.refreshToken);
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

createAuthRefreshInterceptor(AxiosInstance, () => {
  return axios
    .post<TTokens>(
      "/auth/refresh",
      {
        refreshToken: useTokenStore.getState().refresh,
      },
      {
        skipAuthRefresh: true,
      } as AxiosAuthRefreshRequestConfig
    )
    .then((response) => {
      if (response.status === 401) {
        useTokenStore.getState().logout();
        return;
      }

      const data = response.data;
      setTokens(data);
    })
    .catch(() => useTokenStore.getState().logout());
});

export default AxiosInstance;
