import { components } from "@/types/openApiTypes";

type API = components["schemas"];

type LoginRequest = API["LoginRequest"];
type RefreshTokenResponse = API["RefreshTokenResponse"];
type RegisterRequest = API["RegisterRequest"];
type LoginResponse = API["LoginResponse"];
type RefreshTokenRequest = API["RefreshTokenRequest"];
type PaymentResponse = API["PaymentResponse"];
type PreviousPaymentsResponse = API["PreviousPaymentsResponse"];

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
type ContentBundleResponse = API["ContentBundleResponse"];
type ContentResponse = API["ContentResponse"];
type CodingContentResponse = API["CodingContentResponse"];
type QuizContentResponse = API["QuizContentResponse"];
type QuizQuestionResponse = API["QuizQuestionResponse"];
type SeparatedContentBundleResponse = API["SeparatedContentBundleResponse"];
type TestCaseResponse = API["TestCaseResponse"];
type VideoContentResponse = API["VideoContentResponse"];
type RatingResponse = API["RatingResponse"];
type RatingRequest = API["RatingRequest"];
type ResetPasswordRequest = API["ResetPasswordRequest"];
type ForgotPasswordRequest = API["ForgotPasswordRequest"];
type ChangePasswordRequest = API["ChangePasswordRequest"];
type ProfileResponse = API["ProfileResponse"];
type SortObject = API["SortObject"];
type PageShoppingItemResponse = API["PageShoppingItemResponse"];
type PageableObject = API["PageableObject"];
type Pageable = API["Pageable"];
type PageMinimalContentBundleResponse = API["PageMinimalContentBundleResponse"];

export type {
  ChangePasswordRequest,
  CodeQuizSolutionRequest,
  CodeQuizSolutionResponse,
  CodeSolutionRequest,
  CodeSolutionResponse,
  CodingContentResponse,
  ContentBundleResponse,
  ContentResponse,
  ForgotPasswordRequest,
  IncorrectCodeQuizSolutionResponse,
  IncorrectQuizSolutionResponse,
  LoginRequest,
  LoginResponse,
  MinimalContentBundleResponse,
  PageMinimalContentBundleResponse,
  PageShoppingItemResponse,
  Pageable,
  PageableObject,
  PaymentRequest,
  PaymentResponse,
  PreviousPaymentsResponse,
  ProfileResponse,
  QuizContentResponse,
  QuizQuestionResponse,
  QuizSolutionRequest,
  QuizSolutionResponse,
  RatingRequest,
  RatingResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  ResetPasswordRequest,
  SeparatedContentBundleResponse,
  ShoppingCartResponse,
  ShoppingItemResponse,
  SortObject,
  TestCaseOutcomeResponse,
  TestCaseResponse,
  VideoContentResponse,
};
