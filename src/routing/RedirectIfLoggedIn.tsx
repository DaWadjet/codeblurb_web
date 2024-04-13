import useTokenStore from "@/store/tokenStore";
import { FC, useCallback, useMemo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RedirectIfLoggedIn: FC = () => {
  const isLoggedIn = useTokenStore(useCallback((state) => !!state.userId, []));
  const location = useLocation();
  const {
    from: { pathname },
  } = location.state || { from: { pathname: "" } };

  const navigationTarget = useMemo(() => {
    if (pathname) return pathname;
    return "/home";
  }, [pathname]);

  if (isLoggedIn) {
    return (
      <Navigate to={navigationTarget} state={{ from: location }} replace />
    );
  }
  return <Outlet />;
};

export default RedirectIfLoggedIn;
