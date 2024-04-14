import { DarkModeToggle } from "@/components/DarkModeToggle";
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
      className="sticky top-0 z-10 flex h-16 gap-6 items-center px-8 border-b bg-background"
    >
      <Logo />
      <div className="grow" />
      {isLoggedIn ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
      <DarkModeToggle />
    </nav>
  );
};

export default NavigationBar;
