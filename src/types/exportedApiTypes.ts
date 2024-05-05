import QuizContent from "@/pages/content/QuizContent";
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
type CodeExecutionResponse = API["CodeExecutionResponse"];
type TestCaseOutcomeResponse = API["TestCaseOutcomeResponse"];
type CodeQuizSolutionRequest = API["CodeQuizSolutionRequest"];
type CodeQuizSolutionResponse = API["CodeQuizSolutionResponse"];
type IncorrectCodeQuizSolutionResponse =
  API["IncorrectCodeQuizSolutionResponse"];
type CodingContentResponse = API["CodingContentResponse"];
type QuizContentResponse = API["QuizContentResponse"];
type QuizQuestionResponse = API["QuizQuestionResponse"];
type QuizQuestionSolutionRequestItem = API["QuizQuestionSolutionRequestItem"];
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
type PageMinimalContentBundleResponse = API["PageMinimalContentBundleResponse"];

type VideoContent = API["VideoContentResponse"] & {
  contentType: "VIDEO";
};

type QuizContent = API["QuizContentResponse"] & {
  contentType: "QUIZ";
};
type ScratchContent = API["CodingContentResponse"] & {
  contentType: "CODING";
  codingContentType: "SCRATCH";
};

type DragAndDropContent = API["CodingContentResponse"] & {
  contentType: "CODING";
  codingContentType: "DRAG_AND_DROP";
};

type FillInTheGapsContent = API["CodingContentResponse"] & {
  contentType: "CODING";
  codingContentType: "FILL_THE_GAP";
};
type ArticleContent = API["ArticleContentResponse"] & {
  contentType: "ARTICLE";
};

export type {
  ArticleContent,
  ChangePasswordRequest,
  CodeExecutionResponse,
  CodeQuizSolutionRequest,
  CodeQuizSolutionResponse,
  CodeSolutionRequest,
  CodingContentResponse,
  DragAndDropContent,
  FillInTheGapsContent,
  ForgotPasswordRequest,
  IncorrectCodeQuizSolutionResponse,
  IncorrectQuizSolutionResponse,
  LoginRequest,
  LoginResponse,
  MinimalContentBundleResponse,
  PageMinimalContentBundleResponse,
  PageShoppingItemResponse,
  PageableObject,
  PaymentRequest,
  PaymentResponse,
  PreviousPaymentsResponse,
  ProfileResponse,
  QuizContent,
  QuizContentResponse,
  QuizQuestionResponse,
  QuizQuestionSolutionRequestItem,
  QuizSolutionRequest,
  QuizSolutionResponse,
  RatingRequest,
  RatingResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterRequest,
  ResetPasswordRequest,
  ScratchContent,
  SeparatedContentBundleResponse,
  ShoppingCartResponse,
  ShoppingItemResponse,
  SortObject,
  TestCaseOutcomeResponse,
  TestCaseResponse,
  VideoContent,
  VideoContentResponse
};

