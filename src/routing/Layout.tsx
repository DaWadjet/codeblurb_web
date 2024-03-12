import NavigationBar from "@/components/NavigationBar";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="min-h-[100vh]">
      <NavigationBar />
      <div className="font-roboto container mx-auto mt-8 max-w-5xl grow px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
