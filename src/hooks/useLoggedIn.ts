import useTokenStore from "@/store/tokenStore";
import { useCallback } from "react";

export default function useLoggedIn() {
  return useTokenStore(useCallback((state) => !!state.userId, []));
}
