import client from "@/network/axiosClient";
import { ProfileResponse } from "@/types/exportedApiTypes";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const ProfileKeys = {
  profileQuery: ["profile"] as const,
} as const;

const profileQueryOptions = () =>
  queryOptions({
    queryKey: ProfileKeys.profileQuery,
    queryFn: async () => {
      const response = await client.get<ProfileResponse>("/");
      return response.data;
    },
  });

export const useProfileQuery = () => {
  return useQuery(profileQueryOptions());
};
