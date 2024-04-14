import NavigationBar from "@/components/navbar/NavigationBar";
import { Toaster } from "@/shadcn/ui/sonner";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <>
      <div
        style={{ minHeight: "calc(100vh - 56px)" }}
        className="font-inter dark bg-background"
      >
        <NavigationBar />
        <div className="container mx-auto my-8 max-w-5xl grow px-4">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Layout;
