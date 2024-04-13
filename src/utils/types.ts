export type TNonFunctionKeys<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

export type TInformationType = "info" | "danger" | "warning" | "success";

export type THelp = {
  type: TInformationType;
  message: string;
};

export type TDraggableCategory = "all" | "solution";

export type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TCourseSection = {
  id: number;
  title: string;
  subtitle: string;
  estimatedTime: number;
  type: "video" | "coding" | "quiz" | "article";
};

export type TCourseInfo = {
  id: number;
  title: string;
  technology: string;
  rating: number;
  image: string;
  price: number;
};

export type TOverflow = "unspecified" | "right" | "left";

export type TReview = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
};
