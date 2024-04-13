import NavigationBar from "@/components/NavigationBar";
import { Toaster } from "@/shadcn/ui/toaster";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout: FC = () => {
  return (
    <>
      <div style={{ minHeight: "calc(100vh - 56px)" }}>
        <NavigationBar />
        <div className="font-roboto container mx-auto my-8 max-w-5xl grow px-4">
          <Outlet />
        </div>
      </div>
      <Footer />
      <Toaster />
    </>
  );
};

export default Layout;
