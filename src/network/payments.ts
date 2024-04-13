import client from "@/network/axiosClient";
import { PreviousPaymentsResponse } from "@/network/models/previousPaymentsResponse";
import { queryOptions, useQuery } from "@tanstack/react-query";

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
  await client.post("/payments/checkout");
};
