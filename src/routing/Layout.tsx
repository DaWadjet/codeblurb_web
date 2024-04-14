import NavigationBar from "@/components/navbar/NavigationBar";
import { Toaster } from "@/shadcn/ui/sonner";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="font-inter dark bg-background">
      <div className="min-h-[100vh]">
        <NavigationBar />
        <main className="container mx-auto my-8 max-w-5xl grow px-4">
          <Outlet />
        </main>
      </div>
      <Toaster theme="dark" />
    </div>
  );
};

export default Layout;
