import Logo from "@/components/common/Logo";
import NavbarLoggedIn from "@/components/navbar/NavbarLoggedIn";
import NavbarLoggedOut from "@/components/navbar/NavbarLoggedOut";
import useLoggedIn from "@/hooks/useLoggedIn";
import { FC } from "react";

const NavigationBar: FC = () => {
  const isLoggedIn = useLoggedIn();

  return (
    <nav
      role="navigation"
      className="sticky top-0 z-[1] flex h-16 items-center justify-between px-8 shadow-md"
    >
      <Logo />
      {isLoggedIn ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
    </nav>
  );
};

export default NavigationBar;
