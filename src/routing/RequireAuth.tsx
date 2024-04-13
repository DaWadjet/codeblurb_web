import useTokenStore from "@/store/tokenStore";
import { FC, useCallback } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth: FC = () => {
  const isLoggedIn = useTokenStore(useCallback((state) => !!state.userId, []));
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

export default RequireAuth;
