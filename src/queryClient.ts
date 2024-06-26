import useTokenStore from "@/store/tokenStore";
import "@tanstack/react-query";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<{ errorMessage?: string }>;
  }
}

interface CustomMeta extends Record<string, unknown> {
  showToast?: boolean;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: CustomMeta;
    mutationMeta: CustomMeta;
  }
}

const mutationCache = new MutationCache({
  onError(...props) {
    const mutation = props[3];
    if (
      mutation.options.meta?.showToast === false ||
      mutation.options.meta?.showErrorToast === false
    )
      return;
    toast.error(
      mutation.options.meta?.errorMessage ??
        props[0].response?.data?.errorMessage ??
        "Something went wrong!"
    );
  },
  onSuccess(...props) {
    const mutation = props[3];
    if (
      mutation.options.meta?.showToast === false ||
      mutation.options.meta?.showSuccessToast === false
    )
      return;

    toast.info(mutation.options.meta?.successMessage ?? "Success");
  },
});

export const queryClient = new QueryClient({
  mutationCache,
  queryCache: new QueryCache({
    onError(error) {
      if (error.response?.status !== 401) {
        window.location.pathname = "/login";
        useTokenStore.getState().logout();
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});
