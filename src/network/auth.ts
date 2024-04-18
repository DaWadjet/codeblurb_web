import client from "@/network/axiosClient";
import {
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
} from "@/types/ApiTypes";

import useTokenStore from "@/store/tokenStore";
import { LoginRequest } from "@/types/ApiTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthKeys = {
  loginMutation: ["login"] as const,
  register: ["register"] as const,
  logoutMutation: ["logout"] as const,
  forceLogoutMutation: ["forceLogout"] as const,
  resetPasswordMutation: ["resetPassword"] as const,
  requestResetPasswordMutation: ["requestResetPassword"] as const,
} as const;

export const loginMutationFn = async (data: LoginRequest) => {
  const response = await client.post<LoginResponse>("/auth/login", data, {
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
  return response.data;
};

export const logoutMutationFn = async () =>
  client.post("/auth/logout", undefined, {
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);

export const forceLogoutMutationFn = async () =>
  client.post("/auth/force-logout", undefined, {
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);

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

export const resetPasswordMutationFn = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) =>
  //add the bearer token to the auth header
  client.post(
    "/auth/reset-password",
    {
      password: newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig
  );

export const requestResetPasswordMutationFn = async (username: string) =>
  client.post(
    "/auth/forgot-password",
    {
      username,
    },
    {
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig
  );

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
      if (!data.accessToken || !data.refreshToken)
        return console.error("No access or refresh token received");
      console.log(data.accessToken);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    },
    mutationKey: AuthKeys.loginMutation,
  });
};

export const refresh = async (refreshToken: string) =>
  client.post<RefreshTokenResponse>(
    "/auth/refresh-token",
    {
      refreshToken,
    },
    {
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig
  );

export const useLogoutMutation = () => {
  const logout = useTokenStore(useCallback((state) => state.logout, []));
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      await logoutMutationFn();
    },
    mutationKey: AuthKeys.logoutMutation,
    onSettled: () => {
      logout();
      navigate("/", { state: { from: "" } });
    },
  });
};

export const useForceLogoutMutation = () => {
  const logout = useTokenStore(useCallback((state) => state.logout, []));
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      await forceLogoutMutationFn();
    },
    mutationKey: AuthKeys.forceLogoutMutation,
    onSettled: () => {
      logout();
      navigate("/", { state: { from: "" } });
    },
  });
};

export const useResetPasswordMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: { token: string; newPassword: string }) => {
      await resetPasswordMutationFn(data);
    },
    mutationKey: AuthKeys.resetPasswordMutation,
    onSuccess: () => {
      navigate("/login", {
        replace: true,
      });
    },
    meta: {
      successMessage: "Password reset successfully!",
    },
  });
};

export const useRequestResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async (username: string) => {
      await requestResetPasswordMutationFn(username);
    },
    mutationKey: AuthKeys.requestResetPasswordMutation,
    meta: {
      successMessage: "Email sent! Check your inbox!",
    },
  });
};
