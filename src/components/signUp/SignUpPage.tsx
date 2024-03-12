import Loader from "@/components/common/Loader";
import useAuth from "@/hooks/useAuth";
import client from "@/network/axiosClient";
import { LoginResponse } from "@/network/models/loginResponse";
import { RegisterRequest } from "@/network/models/registerRequest";
import clsxm from "@/utils/clsxm";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";

import { useForm } from "react-hook-form";

const SignUpPage: FC = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest & { confirmPassword: string }>();

  const onSubmit = handleSubmit(() => login());

  const { login: saveTokens } = useAuth();
  const { mutate: login, isLoading } = useMutation({
    mutationKey: [`register`],
    mutationFn: async () => {
      await client.post("auth/register", getValues());
      const loginResponse = await client.post<LoginResponse>(
        "auth/login",
        getValues()
      );
      saveTokens(loginResponse.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <form
      className="mx-40 mt-40 flex flex-grow flex-col items-start justify-center gap-6 rounded-lg border border-gray-200 p-5 shadow-md"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-semibold ">Register</h1>
      <div className="flex w-full flex-col gap-2">
        <label
          className="block text-sm font-bold text-gray-700"
          htmlFor="username"
        >
          Username
        </label>
        <input
          {...register("username", { required: "This field is required" })}
          className={clsxm(
            "w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 outline-none transition-all duration-200 focus:border-blue-500",
            errors.username
              ? "border-red-500 bg-red-100/30 focus:border-red-600"
              : ""
          )}
          id="username"
          type="text"
          placeholder="john_doe"
        />
        {errors?.username && (
          <p className="text-sm font-medium text-red-500">
            {errors.username.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label
          className="block text-sm font-bold text-gray-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          {...register("password", { required: "This field is required" })}
          className={clsxm(
            "w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 outline-none transition-all duration-200 focus:border-blue-500",
            errors.password
              ? "border-red-500 bg-red-100/30 focus:border-red-600"
              : ""
          )}
          id="password"
          type="password"
          placeholder="password"
        />
        {errors?.password && (
          <p className="text-sm font-medium text-red-500">
            {errors.password?.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label
          className="block text-sm font-bold text-gray-700"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match!",
          })}
          className={clsxm(
            "w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 outline-none transition-all duration-200 focus:border-blue-500",
            errors.confirmPassword
              ? "border-red-500 bg-red-100/30 focus:border-red-600"
              : ""
          )}
          id="confirmPassword"
          type="password"
          placeholder="password again"
        />
        {errors?.confirmPassword && (
          <p className="text-sm font-medium text-red-500">
            {errors.confirmPassword?.message}
          </p>
        )}
      </div>

      <button
        type="button"
        className="flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2.5 leading-tight text-white"
        onClick={onSubmit}
      >
        {isLoading ? <Loader /> : <p>Register</p>}
      </button>
    </form>
  );
};

export default SignUpPage;
