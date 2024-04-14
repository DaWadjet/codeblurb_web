import { Button } from "@/shadcn/ui/button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const NavbarLoggedOut: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-full gap-10">
      <Button
        variant="link"
        size="lg"
        onClick={() => navigate("/login")}
        className=""
      >
        Log In
      </Button>
      <Button variant="link" size="lg" onClick={() => navigate("/register")}>
        Sign Up
      </Button>
    </div>
  );
};

export default NavbarLoggedOut;
