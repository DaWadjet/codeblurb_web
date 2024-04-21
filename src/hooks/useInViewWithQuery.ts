import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { RefObject } from "react";
import { useIntersection } from "react-use";

export const useInViewWithQuery = (
  ref: RefObject<HTMLElement>,
  query: UseInfiniteQueryResult<unknown, unknown>
) => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;

  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  if (intersection?.isIntersecting && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
};
