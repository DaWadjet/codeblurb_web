import { useAvailableShoppingItemsQuery } from "@/network/shopping";

export const useDummyData = () => {
  const { data } = useAvailableShoppingItemsQuery();

  const items = data?.shoppingItems || [];
  const moreItems = [...items, ...items, ...items, ...items];
  return moreItems;
};
