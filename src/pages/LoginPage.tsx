import Loader from "@/components/common/Loader";
import { useLoginMutation } from "@/network/auth";
import { LoginRequest } from "@/network/models/loginRequest";
import { cn } from "@/shadcnutils";
import { FC } from "react";

import { useForm } from "react-hook-form";

const LoginPage: FC = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const { mutate: login, isPending } = useLoginMutation();

  const onSubmit = handleSubmit(() => login(getValues()));

  return (
    <form
      className="mx-40 mt-40 flex flex-grow flex-col items-start justify-center gap-6 rounded-lg border border-gray-200 p-5 shadow-md"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-semibold ">Log In</h1>
      <div className="flex w-full flex-col gap-2">
        <label
          className="block text-sm font-bold text-gray-700"
          htmlFor="username"
        >
          Username
        </label>
        <input
          {...register("username", { required: "This field is required" })}
          className={cn(
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
          className={cn(
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

      <button
        type="button"
        className="flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2.5 leading-tight text-white"
        onClick={onSubmit}
      >
        {isPending ? <Loader /> : <p>Log In</p>}
      </button>
    </form>
  );
};

export default LoginPage;
