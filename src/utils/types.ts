export type TPageProps = {
  size?: number;
  sort: {
    property: string;
    ascending: boolean;
  } | null;
  skills?: string[] | null;
  title: string;
};

export const DEFAULT_PAGE_SIZE = 10;

export const skillLevelPossibilities = [
  "beginner",
  "intermediate",
  "advanced",
] as const;
