import client from "@/network/axiosClient";
import {
  CodeQuizSolutionRequest,
  CodeQuizSolutionResponse,
  CodeSolutionRequest,
  PageMinimalContentBundleResponse,
  QuizSolutionRequest,
  QuizSolutionResponse,
  SeparatedContentBundleResponse,
} from "@/types/ApiTypes";
import { DEFAULT_PAGE_SIZE, TPageProps } from "@/utils/types";
import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import qs from "qs";

export const ContentKeys = {
  quizSolutionMutation: (id: number) => ["quizSolution", id],
  codeSolutionMutation: (id: number) => ["codeSolution", id],
  codeQuizSolutionMutation: (id: number) => ["codeQuizSolution", id],
  contentBundlesQuery: ({ size, sort }: TPageProps) => [
    "contentBundles",
    size ?? DEFAULT_PAGE_SIZE,
    sort,
  ],
  contentBundleDetailsQuery: (id: number) => ["myContentBundlesSeparated", id],
} as const;

function contentBundlesQueryOptions(pageProps: TPageProps) {
  return infiniteQueryOptions({
    queryKey: ContentKeys.contentBundlesQuery(pageProps),
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const queryParams = qs.stringify({
        size: pageProps.size ?? DEFAULT_PAGE_SIZE,
        page: pageParam,
        sort: pageProps.sort
          ? `${pageProps.sort.property},${
              pageProps.sort.ascending ? "asc" : "desc"
            }`
          : undefined,
      });

      const response = await client.get<PageMinimalContentBundleResponse>(
        `/content/my-content-bundles?${queryParams}`
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

export const useContentBundlesQuery = (pageProps: TPageProps) => {
  return useInfiniteQuery(contentBundlesQueryOptions(pageProps));
};

function contentBundleDetailsQueryOptions(id: number) {
  return queryOptions({
    queryKey: ContentKeys.contentBundleDetailsQuery(id),
    queryFn: async () => {
      const response = await client.get<SeparatedContentBundleResponse>(
        "/content/content-bundles/" + id
      );
      return response.data;
    },
  });
}

export const useContentBundleDetailsQuery = (id: number) => {
  return useQuery(contentBundleDetailsQueryOptions(id));
};

export async function quizSolutionMutationFn({
  contentId,
  quizSolution,
}: {
  contentId: number;
  quizSolution: QuizSolutionRequest;
}) {
  const response = await client.post<QuizSolutionResponse>(
    `/content/quiz/solution/${contentId}`,
    quizSolution
  );
  return response.data;
}

export async function codeSolutionMutationFn({
  contentId,
  codeSolution,
}: {
  contentId: number;
  codeSolution: CodeSolutionRequest;
}) {
  const response = await client.post(
    `/content/scratch-solution/${contentId}`,
    codeSolution
  );
  return response.data;
}

export async function codeQuizSolutionMutationFn({
  contentId,
  codeSolution,
}: {
  contentId: number;
  codeSolution: CodeQuizSolutionRequest;
}) {
  const response = await client.post<CodeQuizSolutionResponse>(
    `/content/code-quiz-solution/${contentId}`,
    codeSolution
  );
  return response.data;
}
