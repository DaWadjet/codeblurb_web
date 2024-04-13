import client from "@/network/axiosClient";
import {
  CodeQuizSolutionRequest,
  CodeQuizSolutionResponse,
  CodeSolutionRequest,
  MyContentBundlesResponse,
  MyContentBundlesSeparatedResponse,
  QuizSolutionRequest,
  QuizSolutionResponse,
} from "@/types/ApiTypes";
import { useQuery } from "@tanstack/react-query";

export const ContentKeys = {
  quizSolutionMutation: (id: number) => ["quizSolution", id],
  codeSolutionMutation: (id: number) => ["codeSolution", id],
  codeQuizSolutionMutation: (id: number) => ["codeQuizSolution", id],
  myContentBundlesQuery: ["myContentBundles"],
  myContentBundlesSeparatedQuery: ["myContentBundlesSeparated"],
} as const;

function myContentBundlesQueryOptions() {
  return {
    queryKey: ContentKeys.myContentBundlesQuery,
    queryFn: async () => {
      const response = await client.get<MyContentBundlesResponse>(
        "/content/my-content-bundles"
      );
      return response.data;
    },
  };
}

export const useMyContentBundlesQuery = () => {
  return useQuery(myContentBundlesQueryOptions());
};

function myContentBundlesSeparatedQueryOptions() {
  return {
    queryKey: ContentKeys.myContentBundlesSeparatedQuery,
    queryFn: async () => {
      const response = await client.get<MyContentBundlesSeparatedResponse>(
        "/content/my-content-bundles/separated"
      );
      return response.data;
    },
  };
}

export const useMyContentBundlesSeparatedQuery = () => {
  return useQuery(myContentBundlesSeparatedQueryOptions());
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
