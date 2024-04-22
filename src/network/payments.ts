import client from "@/network/axiosClient";
import { PreviousPaymentsResponse } from "@/types/ApiTypes";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const PaymentKeys = {
  paymentsQuery: ["payments"] as const,
  checkoutMutation: ["checkout"] as const,
} as const;

function paymentsQueryOptions() {
  return queryOptions({
    queryKey: PaymentKeys.paymentsQuery,
    queryFn: async () => {
      const response = await client.get<PreviousPaymentsResponse>("/payments");
      return response.data;
    },
  });
}

export const usePaymentsQuery = () => {
  return useQuery(paymentsQueryOptions());
};

export const checkoutMutationFn = async () => {
  const response = await client.post<string>("/payments/checkout", {
    successUrl: window.location.origin + "/my-courses",
    cancelUrl: window.location.origin + "/shopping-cart",
  });
  return { redirectUrl: response.data };
};

export const useCheckoutMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: PaymentKeys.checkoutMutation,
    mutationFn: checkoutMutationFn,
    onSuccess: ({ redirectUrl }) => {
      navigate(redirectUrl);
    },
  });
};
