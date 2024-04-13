import { TNonFunctionKeys } from "@/utils/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TState = {
  selectedTab: number;
  isPurchased: boolean;
  setValue<K extends TNonFunctionKeys<TState>>(key: K, value: TState[K]): void;
  getProperties<K extends TNonFunctionKeys<TState>>(
    keys: K[]
  ): Pick<TState, TNonFunctionKeys<TState>>;
  reset: () => void;
};

const initialState = {
  selectedTab: 0,
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
      getProperties: (keys) => {
        const result = {} as Pick<TState, TNonFunctionKeys<TState>>;

        keys.forEach((key) => {
          result[key] = get()[key];
        });

        return result;
      },
      reset: () => {
        set(() => initialState, false, "useCourseDetailsStore/reset");
      },
    })),
    { name: "Course Details Store" }
  )
);

export default useCourseDetailsStore;
