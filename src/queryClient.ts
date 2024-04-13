import { MutationCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}

const mutationCache = new MutationCache({
  onError: (error) => {
    console.log(error);
  },
});

export const queryClient = new QueryClient({
  mutationCache,
});
