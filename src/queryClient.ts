import { toast } from "@/shadcn/ui/use-toast";
import "@tanstack/react-query";
import { MutationCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
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
    toast({
      variant: "destructive",
      title: mutation.options.meta?.errorMessage ?? "Something went wrong!",
    });

    console.log("Error", props[0]);
  },
  onSuccess(...props) {
    const mutation = props[3];
    if (
      mutation.options.meta?.showToast === false ||
      mutation.options.meta?.showSuccessToast === false
    )
      return;

    toast({
      title: mutation.options.meta?.successMessage ?? "Success",
    });
  },
});

export const queryClient = new QueryClient({
  mutationCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});
