import { components } from "@/types/openApiTypes";

type API = components["schemas"];

type LoginRequest = API["LoginRequest"];
type RefreshTokenResponse = API["RefreshTokenResponse"];
type RegisterRequest = API["RegisterRequest"];
type LoginResponse = API["LoginResponse"];
type RefreshTokenRequest = API["RefreshTokenRequest"];
type PaymentResponse = API["PaymentResponse"];
type PreviousPaymentsResponse = API["PreviousPaymentsResponse"];
type GetAvailableShoppingItemsResponse =
  API["GetAvailableShoppingItemsResponse"];
type MinimalContentBundleResponse = API["MinimalContentBundleResponse"];
type ShoppingCartResponse = API["ShoppingCartResponse"];
type ShoppingItemResponse = API["ShoppingItemResponse"];
type PaymentRequest = API["PaymentRequest"];
type QuizSolutionRequest = API["QuizSolutionRequest"];
type IncorrectQuizSolutionResponse = API["IncorrectQuizSolutionResponse"];
type QuizSolutionResponse = API["QuizSolutionResponse"];
type CodeSolutionRequest = API["CodeSolutionRequest"];
type CodeSolutionResponse = API["CodeSolutionResponse"];
type TestCaseOutcomeResponse = API["TestCaseOutcomeResponse"];
type CodeQuizSolutionRequest = API["CodeQuizSolutionRequest"];
type CodeQuizSolutionResponse = API["CodeQuizSolutionResponse"];
type IncorrectCodeQuizSolutionResponse =
  API["IncorrectCodeQuizSolutionResponse"];
type MyContentBundlesResponse = API["MyContentBundlesResponse"];
type ContentBundleResponse = API["ContentBundleResponse"];
type ContentResponse = API["ContentResponse"];
type MyContentBundlesSeparatedResponse =
  API["MyContentBundlesSeparatedResponse"];
type CodingContentResponse = API["CodingContentResponse"];
type QuizContentResponse = API["QuizContentResponse"];
type QuizQuestionResponse = API["QuizQuestionResponse"];
type SeparatedContentBundleResponse = API["SeparatedContentBundleResponse"];
type TestCaseResponse = API["TestCaseResponse"];
type VideoContentResponse = API["VideoContentResponse"];

export type {
  CodeQuizSolutionRequest,
  CodeQuizSolutionResponse,
  CodeSolutionRequest,
  CodeSolutionResponse,
  CodingContentResponse,
  ContentBundleResponse,
  ContentResponse,
  GetAvailableShoppingItemsResponse,
  IncorrectCodeQuizSolutionResponse,
  IncorrectQuizSolutionResponse,
  LoginRequest,
  LoginResponse,
  MinimalContentBundleResponse,
  MyContentBundlesResponse,
  MyContentBundlesSeparatedResponse,
  PaymentRequest,
  PaymentResponse,
  PreviousPaymentsResponse,
  QuizContentResponse,
  QuizQuestionResponse,
  QuizSolutionRequest,
  QuizSolutionResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  SeparatedContentBundleResponse,
  ShoppingCartResponse,
  ShoppingItemResponse,
  TestCaseOutcomeResponse,
  TestCaseResponse,
  VideoContentResponse,
};
