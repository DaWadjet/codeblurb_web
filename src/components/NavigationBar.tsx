import useAuth from "@/hooks/useAuth";
import { isLoggedInAtom } from "@/store/jotaiAtoms";
import clsxm from "@/utils/clsxm";
import { useAtomValue } from "jotai";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./common/Logo";

const NavigationBar: FC = () => {
  const { logout } = useAuth();
  const isLoggedIn = useAtomValue(isLoggedInAtom);

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
              clsxm(
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
              clsxm(
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
              clsxm(
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
              clsxm(
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
              clsxm(
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
            onClick={logout}
            className={clsxm(
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
              clsxm(
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
              clsxm(
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
