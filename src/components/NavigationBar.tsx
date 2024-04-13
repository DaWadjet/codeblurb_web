import Logo from "@/components/common/Logo";
import { useLogoutMutation } from "@/network/auth";
import { cn } from "@/shadcnutils";
import useTokenStore from "@/store/tokenStore";
import { FC, useCallback } from "react";
import { NavLink } from "react-router-dom";

const NavigationBar: FC = () => {
  const { mutate: logout } = useLogoutMutation();
  const isLoggedIn = useTokenStore(useCallback((state) => !!state.userId, []));

  return (
    <nav
      role="navigation"
      className="sticky top-0 z-[999] flex h-16 items-center justify-between bg-white px-8 shadow-md"
    >
      <Logo />
      {isLoggedIn ? (
        <div className="flex h-full gap-10">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              cn(
                "flex items-center justify-center ",
                isActive
                  ? "text-blue-500"
                  : "text-black transition-all duration-100 hover:scale-105"
              )
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              cn(
                "flex items-center justify-center ",
                isActive
                  ? "text-blue-500"
                  : "text-black transition-all duration-100 hover:scale-105"
              )
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/my-courses"
            className={({ isActive }) =>
              cn(
                "flex items-center justify-center ",
                isActive
                  ? "text-blue-500"
                  : "text-black transition-all duration-100 hover:scale-105"
              )
            }
          >
            My Courses
          </NavLink>
          <NavLink
            to="/shopping-cart"
            className={({ isActive }) =>
              cn(
                "flex items-center justify-center ",
                isActive
                  ? "text-blue-500"
                  : "text-black transition-all duration-100 hover:scale-105"
              )
            }
          >
            Cart icon
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              cn(
                "flex items-center justify-center ",
                isActive
                  ? "text-blue-500"
                  : "text-black transition-all duration-100 hover:scale-105"
              )
            }
          >
            Profile Icon
          </NavLink>
          <button
            onClick={() => logout()}
            className={cn(
              "flex items-center justify-center text-black transition-all duration-100 hover:scale-105"
            )}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex h-full gap-10">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              cn(
                "flex items-center justify-center ",
                isActive
                  ? "text-blue-500"
                  : "text-black transition-all duration-100 hover:scale-105"
              )
            }
          >
            Log In
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              cn(
                "flex items-center justify-center ",
                isActive
                  ? "text-blue-500"
                  : "text-black transition-all duration-100 hover:scale-105"
              )
            }
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
