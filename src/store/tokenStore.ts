import { queryClient } from "@/queryClient";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type TState = {
  access: string | null;
  refresh: string | null;
  userId: number | null;
  username: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  reset(): void;
  logout(): void;
};

const initialState = {
  access: null,
  refresh: null,
  userId: null,
  username: null,
};

export const useTokenStore = create<TState>()(
  persist(
    devtools(
      immer((set, get) => ({
        ...initialState,
        setAccessToken: (accessToken) => {
          const decodedToken = jwtDecode(accessToken ?? "");
          set(
            (state) => {
              state.access = accessToken;

              const stripeCustomerId =
                decodedToken &&
                typeof decodedToken === "object" &&
                "stripeCustomerId" in decodedToken &&
                decodedToken.stripeCustomerId &&
                typeof decodedToken.stripeCustomerId === "number"
                  ? decodedToken.stripeCustomerId
                  : null;

              const customerId =
                decodedToken &&
                typeof decodedToken === "object" &&
                "customerId" in decodedToken &&
                decodedToken.customerId &&
                typeof decodedToken.customerId === "number"
                  ? decodedToken.customerId
                  : null;

              state.userId = customerId || stripeCustomerId || null;

              if (
                decodedToken &&
                typeof decodedToken === "object" &&
                "aud" in decodedToken &&
                decodedToken.aud &&
                typeof decodedToken.aud === "string"
              )
                state.username = decodedToken.aud;
            },
            false,
            "useTokenStore/setAccessToken"
          );
        },
        setRefreshToken: (refreshToken) =>
          set(
            (state) => {
              state.refresh = refreshToken;
            },
            false,
            "useTokenStore/setRefreshToken"
          ),
        logout: () => {
          get().reset();
          queryClient.clear();
        },

        reset: () => {
          set(() => initialState, false, "useTokenStore/reset");
          localStorage.removeItem("token-storage");
        },
      })),
      { name: "Token Store" }
    ),
    {
      name: "token-store",
    }
  )
);

export default useTokenStore;
