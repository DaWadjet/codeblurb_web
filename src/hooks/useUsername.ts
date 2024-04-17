import useTokenStore from "@/store/tokenStore";
import { useCallback } from "react";

const useUsername = () => {
  return useTokenStore(useCallback((state) => state.username!, []));
};
export default useUsername;
