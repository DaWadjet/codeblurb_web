import { Button } from "@/shadcn/ui/button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const NavbarLoggedOut: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-6 items-center">
      <Button
        variant="link"
        onClick={() => navigate("/login")}
        data-test="navbar-login-button"
      >
        Log In
      </Button>
      <Button
        variant="link"
        onClick={() => navigate("/register")}
        data-test="navbar-register-button"
      >
        Sign Up
      </Button>
    </div>
  );
};

export default NavbarLoggedOut;
