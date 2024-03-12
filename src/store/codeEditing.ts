import { THelp, TNonFunctionKeys } from "@/utils/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TState = {
  code: string;
  hints: THelp[];
  usefulTips: THelp[];
  canGetMoreHints: boolean;
  run(): void;
  getHint(): void;
  clear(): void;
  setValue<K extends TNonFunctionKeys<TState>>(key: K, value: TState[K]): void;
  getProperties<K extends TNonFunctionKeys<TState>>(
    keys: K[]
  ): Pick<TState, TNonFunctionKeys<TState>>;
};

const initialState = {
  code: "",
  hints: [],
  usefulTips: [],
  canGetMoreHints: true,
} as Pick<TState, TNonFunctionKeys<TState>>;

const useCodeEditingStore = create<TState>()(
  immer(
    devtools(
      (set, get) => ({
        ...initialState,
        setValue: (key, value) =>
          set(
            (state) => {
              state[key] = value;
            },
            false,
            "useCodeEditingStore/setValue"
          ),
        getProperties: (keys) => {
          const result = {} as Pick<TState, TNonFunctionKeys<TState>>;

          keys.forEach((key) => {
            result[key] = get()[key];
          });

          return result;
        },
        run: () => {
          //TODO send code to the server
          console.log(get().code);
        },
        getHint: () => {
          if (get().canGetMoreHints) {
            set((state) => {
              state.hints.push({ type: "danger", message: "And another one" });
              if (state.hints.length >= 2) state.canGetMoreHints = false;
            });
          }
        },
        clear: () => {
          set((state) => ({ ...state, ...initialState }));
        },
      }),
      { name: "codeEditingStore" }
    )
  )
);

export default useCodeEditingStore;
