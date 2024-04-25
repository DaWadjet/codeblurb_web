import Dialog from "@/components/common/AlertDialog";
import NavigationBar from "@/components/navbar/NavigationBar";
import { ScrollArea } from "@/shadcn/ui/scroll-area";

import { Toaster } from "@/shadcn/ui/sonner";
import { useTheme } from "@/shadcn/ui/theme-provider";

import { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className="font-inter bg-background">
        <NavigationBar />
        <ScrollArea
          className="overflow-y-auto"
          style={{
            height: "calc(100vh - 64px)",
          }}
        >
          <main className="container mx-auto my-8 max-w-5xl grow px-4 pb-10">
            <Outlet />
          </main>
        </ScrollArea>
      </div>

      <Dialog />
      <Toaster theme={theme ?? "system"} />
    </>
  );
};

export default Layout;
