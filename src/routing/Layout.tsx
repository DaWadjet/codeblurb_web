import Dialog from "@/components/AlertDialog";
import NavigationBar from "@/components/navbar/NavigationBar";

import { Toaster } from "@/shadcn/ui/sonner";
import { useTheme } from "@/shadcn/ui/theme-provider";

import { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className="font-inter bg-background min-h-screen">
        <NavigationBar />
        <main className="container mx-auto my-8 max-w-5xl grow px-4 pb-10">
          <Outlet />
        </main>
      </div>
      <Dialog />
      <Toaster theme={theme ?? "system"} />
    </>
  );
};

export default Layout;
