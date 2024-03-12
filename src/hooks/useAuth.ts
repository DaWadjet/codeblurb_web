import { isLoggedInAtom } from "@/store/jotaiAtoms";
import { useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { useLocalStorage } from "react-use";
import { LoginResponse } from "./../network/models/loginResponse";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);

  const [accessToken, setAccessToken, removeAccessToken] =
    useLocalStorage<string>("accessToken", undefined, {
      raw: true,
    });
  const [refreshToken, setRefreshToken, removeRefreshToken] =
    useLocalStorage<string>("refreshToken", undefined, {
      raw: true,
    });

  const logout = useCallback(() => {
    removeAccessToken();
    removeRefreshToken();
    setIsLoggedIn(false);
  }, [removeAccessToken, removeRefreshToken, setIsLoggedIn]);

  const userId = useMemo(
    () =>
      accessToken
        ? jwtDecode<{ userId: string }>(accessToken).userId
        : undefined,

    [accessToken]
  );

  const login = useCallback(
    (tokens: LoginResponse) => {
      setIsLoggedIn(true);
      setRefreshToken(tokens.refreshToken);
      setAccessToken(tokens.accessToken);
    },
    [setIsLoggedIn, setRefreshToken, setAccessToken]
  );

  return {
    isLoggedIn: !!userId,
    login,
    logout,
    tokens: { accessToken, refresh: refreshToken },
    userId,
  };
};

export default useAuth;
