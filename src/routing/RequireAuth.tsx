import { isLoggedInAtom } from "@/store/jotaiAtoms";
import { useAtomValue } from "jotai";
import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth: FC = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
