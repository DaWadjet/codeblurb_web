import client from "@/network/axiosClient";
import {
  GetAvailableShoppingItemsResponse,
  ShoppingCartResponse,
} from "@/types/ApiTypes";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const ShoppingKeys = {
  addItemMutation: ["addItem"] as const,
  restoreShoppingCartQuery: ["restoreShoppingCart"] as const,
  availableShoppingItemsQuery: ["availableShoppingItems"] as const,
  deleteItemMutation: ["deleteItem"] as const,
} as const;

function restoreShoppingCartOptions() {
  return queryOptions({
    queryKey: ShoppingKeys.restoreShoppingCartQuery,
    queryFn: async () => {
      const response = await client.get<ShoppingCartResponse>(
        "/shopping/restore-shopping-cart"
      );
      return response.data;
    },
  });
}

function availableShoppingItemsOptions() {
  return queryOptions({
    queryKey: ShoppingKeys.availableShoppingItemsQuery,
    queryFn: async () => {
      const response = await client.get<GetAvailableShoppingItemsResponse>(
        "/shopping/available-shopping-items"
      );
      return response.data;
    },
  });
}

export const useShoppingCartRestoreQuery = () => {
  return useQuery(restoreShoppingCartOptions());
};

export const useAvailableShoppingItemsQuery = () => {
  return useQuery(availableShoppingItemsOptions());
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
