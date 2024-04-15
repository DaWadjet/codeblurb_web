import { TNonFunctionKeys } from "@/utils/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TState = {
  selectedTab: "summary" | "reviews";
  isPurchased: boolean;
  setValue<K extends TNonFunctionKeys<TState>>(key: K, value: TState[K]): void;

  reset: () => void;
};

const initialState = {
  selectedTab: "summary",
  isPurchased: false,
} as Pick<TState, TNonFunctionKeys<TState>>;

const useCourseDetailsStore = create<TState>()(
  devtools(
    immer((set, get) => ({
      ...initialState,
      setValue: (key, value) =>
        set(
          (state) => {
            state[key] = value;
          },
          false,
          "useCourseDetailsStore/setValue"
        ),
      reset: () => {
        set(() => initialState, false, "useCourseDetailsStore/reset");
      },
    })),
    { name: "Course Details Store" }
  )
);

export default useCourseDetailsStore;
