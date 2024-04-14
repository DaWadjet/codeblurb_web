import useLoggedIn from "@/hooks/useLoggedIn";
import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth: FC = () => {
  const isLoggedIn = useLoggedIn();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

export default RequireAuth;
