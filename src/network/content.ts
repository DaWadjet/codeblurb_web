import useRefetchOnCourseStatusChange from "@/hooks/useRefetchOnCourseStatusChange";
import client from "@/network/axiosClient";
import {
  CodeExecutionResponse,
  CodeQuizSolutionRequest,
  CodeQuizSolutionResponse,
  CodeSolutionRequest,
  PageMinimalContentBundleResponse,
  QuizSolutionRequest,
  QuizSolutionResponse,
  SeparatedContentBundleResponse,
} from "@/types/exportedApiTypes";
import { DEFAULT_PAGE_SIZE, TPageProps } from "@/utils/types";
import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import qs from "qs";

export const ContentKeys = {
  quizSolutionMutation: (id: number) => ["quizSolution", id] as const,
  codeSolutionMutation: (id: number) => ["codeSolution", id] as const,
  codeQuizSolutionMutation: (id: number) => ["codeQuizSolution", id] as const,
  contentBundlesQuery: (props?: TPageProps) =>
    [
      "contentBundles",
      props?.size ?? DEFAULT_PAGE_SIZE,
      props?.sort ?? null,
      props?.title ?? "",
      props?.skills ?? [],
    ] as const,
  contentBundleDetailsQuery: (id: number) =>
    ["contentBundleDetails", id] as const,
} as const;

function contentBundlesQueryOptions(pageProps?: TPageProps) {
  return infiniteQueryOptions({
    queryKey: ContentKeys.contentBundlesQuery(pageProps),
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const queryParams = qs.stringify({
        pageSize: pageProps?.size ?? DEFAULT_PAGE_SIZE,
        page: pageParam,
        sort: pageProps?.sort
          ? `${pageProps?.sort.property},${
              pageProps?.sort.ascending ? "asc" : "desc"
            }`
          : undefined,
        skills: pageProps?.skills?.length
          ? pageProps?.skills.join(",")
          : undefined,
        title: pageProps?.title,
      });

      const response = await client.get<PageMinimalContentBundleResponse>(
        `/content/content-bundles?${queryParams}`
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

export const useContentBundlesQuery = (pageProps?: TPageProps) => {
  return useInfiniteQuery(contentBundlesQueryOptions(pageProps));
};

export function contentBundleDetailsQueryOptions(id: number) {
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

export const useContentBundleDetailsQuery = ({
  id,
  enabled,
}: {
  id: number;
  enabled?: boolean;
}) => {
  return useQuery({ ...contentBundleDetailsQueryOptions(id), enabled });
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

export const useQuizSolutionSubmissionMutation = ({
  contentId,
  courseId,
}: {
  contentId: number;
  courseId: number;
}) => {
  const refetch = useRefetchOnCourseStatusChange(courseId);
  return useMutation({
    mutationKey: ContentKeys.quizSolutionMutation(contentId),
    meta: {
      showSuccessToast: false,
    },
    mutationFn: async ({
      quizSolution,
    }: {
      quizSolution: QuizSolutionRequest;
    }) => {
      const result = await quizSolutionMutationFn({ contentId, quizSolution });
      refetch();
      return result;
    },
  });
};

export async function codeSolutionMutationFn({
  contentId,
  codeSolution,
}: {
  contentId: number;
  codeSolution: CodeSolutionRequest;
}) {
  const response = await client.post<CodeExecutionResponse>(
    `/content/code/scratch-solution/${contentId}`,
    codeSolution,
    {
      timeout: 20_000,
    }
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
    `/content/code/code-quiz-solution/${contentId}`,
    codeSolution
  );
  return response.data;
}

export const useCodeQuizSolutionMutation = ({
  contentId,
  courseId,
}: {
  contentId: number;
  courseId: number;
}) => {
  const refetch = useRefetchOnCourseStatusChange(courseId);

  return useMutation({
    mutationKey: ContentKeys.codeQuizSolutionMutation(contentId),
    meta: {
      showSuccessToast: false,
    },
    mutationFn: async ({
      codeSolution,
    }: {
      codeSolution: CodeQuizSolutionRequest;
    }) => {
      const solution = await codeQuizSolutionMutationFn({
        contentId,
        codeSolution,
      });
      refetch();
      return solution;
    },
  });
};

export const useScratchSubmitMutation = ({
  contentId,
  courseId,
}: {
  contentId: number;
  courseId: number;
}) => {
  const refetch = useRefetchOnCourseStatusChange(courseId);

  return useMutation({
    mutationKey: ContentKeys.codeSolutionMutation(contentId),
    meta: {
      showSuccessToast: false,
    },
    mutationFn: async ({
      codeSolution,
    }: {
      codeSolution: CodeSolutionRequest;
    }) => {
      const result = await codeSolutionMutationFn({ contentId, codeSolution });
      refetch();
      return result;
    },
  });
};
