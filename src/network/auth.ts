import client from "@/network/axiosClient";
import { LoginRequest } from "@/network/models/loginRequest";
import {
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
} from "@/network/models/models";
import useTokenStore from "@/store/tokenStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthKeys = {
  loginMutation: ["login"] as const,
  register: ["register"] as const,
  logoutMutation: ["logout"] as const,
  forceLogoutMutation: ["forceLogout"] as const,
} as const;

export const loginMutationFn = async (data: LoginRequest) => {
  const response = await client.post<LoginResponse>("/auth/login", data);
  return response.data;
};

export const logoutMutationFn = async () =>
  client.post("/auth/logout", undefined, {
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);

export const forceLogoutMutationFn = async () =>
  client.post("/auth/force-logout");

const registerMutationFn = async (data: RegisterRequest) =>
  client.post("/auth/register", data);

export const useRegistrationMutation = () => {
  const { mutateAsync: login } = useLoginMutation();
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      await registerMutationFn(data);
      await login(data);
    },
    mutationKey: AuthKeys.register,
  });
};

export const useLoginMutation = () => {
  const setAccessToken = useTokenStore(
    useCallback((state) => state.setAccessToken, [])
  );
  const setRefreshToken = useTokenStore(
    useCallback((state) => state.setRefreshToken, [])
  );
  return useMutation({
    mutationFn: async (data: LoginRequest) => loginMutationFn(data),
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    },
    meta: {
      showToast: false,
    },
    mutationKey: AuthKeys.loginMutation,
  });
};

export const refresh = async (refreshToken: string) => {
  const response = await client.post<RefreshTokenResponse>(
    "/auth/refresh-token",
    {
      refreshToken,
    }
  );
  return response.data;
};

export const useLogoutMutation = () => {
  const logout = useTokenStore(useCallback((state) => state.logout, []));
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      await logoutMutationFn();
      logout();
    },
    mutationKey: AuthKeys.logoutMutation,
    onSettled: () => {
      logout();
      navigate("/", { state: { from: "" } });
    },
  });
};
