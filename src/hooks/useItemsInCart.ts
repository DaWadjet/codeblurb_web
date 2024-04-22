import { useShoppingCartQuery } from "@/network/shopping";
import { useMemo } from "react";

const useItemsInCart = () => {
  const { data } = useShoppingCartQuery();
  const itemsInCart = useMemo(
    () => (data?.shoppingItems ?? []).map((item) => item!.id!),
    [data]
  );
  return itemsInCart;
};
export default useItemsInCart;
