import { queryClient } from "@/main";
import { TNonFunctionKeys } from "@/utils/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TState = {
  userId: number;
  logout(): void;
  setValue<K extends TNonFunctionKeys<TState>>(key: K, value: TState[K]): void;
  getProperties<K extends TNonFunctionKeys<TState>>(
    keys: K[]
  ): Pick<TState, TNonFunctionKeys<TState>>;
};

const initialState = {
  userId: -1,
} as Pick<TState, TNonFunctionKeys<TState>>;

const useUserStore = create<TState>()(
  devtools(
    immer((set, get) => ({
      ...initialState,
      setValue: (key, value) =>
        set(
          (state) => {
            state[key] = value;
          },
          false,
          "userStore/setValue"
        ),
      getProperties: (keys) => {
        const result = {} as Pick<TState, TNonFunctionKeys<TState>>;

        keys.forEach((key) => {
          result[key] = get()[key];
        });

        return result;
      },
      logout: () => {
        queryClient.clear();
        set(initialState, false, "userStore/logout");
      },
    })),
    { name: "userStore" }
  )
);

export default useUserStore;

// import { TNonFunctionKeys } from "@/utils/types";
// import {create} from "zustand";
// import {devtools} from "zustand/middleware";
// import {immer} from "zustand/middleware/immer";

// type TState = {
//    userId: number
// };

// const initialState = {
//  userId: 0
// } as Pick<TState, TNonFunctionKeys<TState>>;

// const useUserStore = create<TState>()(
//   devtools(
//     immer((set, _get) => ({
//         ...initialState
//     })),
//     {name: "userStore"},
//   ),
// );

// export default useUserStore;
