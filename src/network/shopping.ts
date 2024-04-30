import client from "@/network/axiosClient";
import {
  PageShoppingItemResponse,
  ShoppingCartResponse,
  ShoppingItemResponse,
} from "@/types/ApiTypes";
import { DEFAULT_PAGE_SIZE, TPageProps } from "@/utils/types";
import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import qs from "qs";
import { useMemo, useState } from "react";

export const ShoppingKeys = {
  addItemMutation: ["addItem"] as const,
  shoppingCartQuery: ["shoppingCart"] as const,
  shoppingItemDetailsQuery: (id: number) =>
    ["shoppingItemDetails", id] as const,
  availableShoppingItemsQuery: (props: TPageProps) =>
    [
      "availableShoppingItems",
      props.size ?? DEFAULT_PAGE_SIZE,
      props.sort,
      props.skills,
      props.title,
    ] as const,
  deleteItemMutation: ["deleteItem"] as const,
} as const;

function shoppingCartQueryOptions() {
  return queryOptions({
    queryKey: ShoppingKeys.shoppingCartQuery,
    queryFn: async () => {
      const response = await client.get<ShoppingCartResponse>(
        "/shopping/shopping-cart"
      );
      return response.data;
    },
  });
}

function availableShoppingItemsQueryOptions(pageProps: TPageProps) {
  return infiniteQueryOptions({
    queryKey: ShoppingKeys.availableShoppingItemsQuery(pageProps),
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const queryParams = qs.stringify({
        pageSize: pageProps.size ?? DEFAULT_PAGE_SIZE,
        page: pageParam,
        sort: pageProps.sort
          ? `${pageProps.sort.property},${
              pageProps.sort.ascending ? "asc" : "desc"
            }`
          : undefined,
        skills: pageProps.skills?.length
          ? pageProps.skills.join(",")
          : undefined,
        title: pageProps.title || undefined,
      });

      const response = await client.get<PageShoppingItemResponse>(
        `/shopping/available-shopping-items?${queryParams}`
      );

      return response.data;
    },
    getNextPageParam: (lastResponse) => {
      if (lastResponse.last) {
        return null;
      }
      return lastResponse.number! + 1;
    },
    select: (data) => ({
      ...data,
      items: data.pages.flatMap((page) => page.content),
    }),
  });
}

export const useShoppingCartQuery = () => {
  return useQuery(shoppingCartQueryOptions());
};

export const useAvailableShoppingItemsQuery = (props?: TPageProps) => {
  return useInfiniteQuery(
    availableShoppingItemsQueryOptions(
      props ?? {
        skills: null,
        title: "",
        sort: null,
      }
    )
  );
};

export const shoppingItemDetailsQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ShoppingKeys.shoppingItemDetailsQuery(id),
    queryFn: async () => {
      const response = await client.get<ShoppingItemResponse>(
        `/shopping/shopping-item/${id}`
      );
      return response.data;
    },
  });
};

export const useShoppingItemDetailsQuery = ({
  id,
  enabled,
}: {
  id: number;
  enabled?: boolean;
}) => {
  return useQuery({ ...shoppingItemDetailsQueryOptions(id), enabled });
};

export const addItemMutationFn = async (shoppingCartItemId: number) => {
  const response = await client.post<ShoppingCartResponse>(
    `/shopping/add-item/${shoppingCartItemId}`
  );
  return response.data;
};

export const deleteItemMutationFn = async (shoppingCartItemId: number) => {
  const response = await client.delete<ShoppingCartResponse>(
    `/shopping/delete-item/${shoppingCartItemId}`
  );
  return response.data;
};

export const useAddItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await addItemMutationFn(id);
      await queryClient.refetchQueries({
        queryKey: ShoppingKeys.shoppingCartQuery,
      });
    },
    mutationKey: ShoppingKeys.addItemMutation,
    meta: {
      successMessage: "Item added to cart",
    },
  });
};

export const useDeleteItemMutation = () => {
  const [isPendingId, setIsPendingId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      await deleteItemMutationFn(id);
      await queryClient.refetchQueries({
        queryKey: ShoppingKeys.shoppingCartQuery,
      });
    },
    onMutate: async (id: number) => {
      setIsPendingId(id);
    },
    onSettled: () => {
      setIsPendingId(null);
    },
    mutationKey: ShoppingKeys.deleteItemMutation,
    meta: {
      successMessage: "Item removed from cart",
    },
  });

  return useMemo(
    () => ({
      mutation,
      isPendingId,
    }),
    [mutation, isPendingId]
  );
};
