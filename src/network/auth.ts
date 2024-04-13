import useAuth from "@/hooks/useAuth";
import client from "@/network/axiosClient";
import { LoginRequest } from "@/network/models/loginRequest";
import {
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
} from "@/network/models/models";
import { useMutation } from "@tanstack/react-query";

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

export const logoutMutationFn = async () => client.post("/auth/logout");
export const forceLogoutMutationFn = async () =>
  client.post("/auth/force-logout");

const registerMutationFn = async (data: RegisterRequest) =>
  client.post("/auth/register", data);

export const useRegistrationMutation = () => {
  const { login: saveTokens } = useAuth();
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      await registerMutationFn(data);
      const response = await loginMutationFn(data);
      saveTokens(response);
    },
    mutationKey: AuthKeys.register,
  });
};

export const useLoginMutation = () => {
  const { login: saveTokens } = useAuth();
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await loginMutationFn(data);
      saveTokens(response);
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
