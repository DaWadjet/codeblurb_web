import client from "@/network/axiosClient";
import {
  PageShoppingItemResponse,
  ShoppingCartResponse,
} from "@/types/ApiTypes";
import { DEFAULT_PAGE_SIZE, TPageProps } from "@/utils/types";
import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import qs from "qs";

export const ShoppingKeys = {
  addItemMutation: ["addItem"] as const,
  shoppingCartQuery: ["shoppingCart"] as const,
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
    getPreviousPageParam: (lastResponse) => {
      if (lastResponse.first) {
        return null;
      }
      return lastResponse.number! - 1;
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
