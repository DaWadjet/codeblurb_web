import UserAvatar from "@/components/UserAvatar";
import { useForceLogoutMutation, useLogoutMutation } from "@/network/auth";
import { useProfileQuery } from "@/network/profile";
import ChangePasswordTab from "@/pages/profile/ChangePasswordTab";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcn/ui/breadcrumb";
import { Button } from "@/shadcn/ui/button";
import { Card, CardContent } from "@/shadcn/ui/card";
import { Separator } from "@/shadcn/ui/separator";
import { cn } from "@/shadcnutils";
import dayjs from "dayjs";
import { EyeIcon, Loader2Icon, SquareGanttChart } from "lucide-react";
import { FC, useState } from "react";

const ProfilePage: FC = () => {
  const { data: profile, isPending } = useProfileQuery();
  const [tab, setTab] = useState<"overview" | "resetPassword">("overview");
  const { mutate: logout } = useLogoutMutation();
  const { mutate: logoutFromAllDevices } = useForceLogoutMutation();

  if (isPending) {
    return (
      <Loader2Icon className="size-24 animate-spin mx-auto my-auto min-h-[90vh]" />
    );
  }

  return (
    <div className="mx-40 my-20 flex flex-col gap-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="flex p-0 h-[520px]">
        <CardContent className="flex flex-col gap-6 items-center p-6 flex-1 h-auto">
          <UserAvatar className="size-20 text-2xl font-semibold" />
          <h2 className="text-2xl font-bold text-ellipsis line-clamp-2">
            {profile?.username}
          </h2>
          <div className="flex flex-col items-stretch gap-1 w-full">
            <Separator className="mb-2" />
            <Button
              variant="ghost"
              className={cn(
                "justify-start gap-2",
                tab === "overview" ? "bg-accent/70 text-accent-foreground " : ""
              )}
              onClick={() => setTab("overview")}
            >
              <SquareGanttChart className="size-5" />
              Overview
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "justify-start gap-2",
                tab === "resetPassword"
                  ? "bg-accent/70 text-accent-foreground "
                  : ""
              )}
              onClick={() => setTab("resetPassword")}
            >
              <EyeIcon className="size-5" />
              Change password
            </Button>
            <Separator className="mt-2" />
          </div>
          <Button
            variant="ghost"
            className="flex gap-2 items-center mt-auto text-muted-foreground"
            onClick={() => {
              //TODO
            }}
          >
            Get the app
            <svg
              className="size-5 text-muted-foreground"
              fill="currentColor"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Google</title>
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            <svg
              className="size-6 text-muted-foreground"
              fill="currentColor"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Apple</title>
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
          </Button>
        </CardContent>
        <Separator orientation="vertical" className="h-auto" />
        <CardContent className="flex-[3] p-6">
          {tab === "overview" ? (
            <div className="flex flex-col gap-6 items-start p-1 h-full">
              <h3 className="font-semibold text-3xl mb-6">Profile</h3>
              <div className="flex flex-col gap-1.5">
                <label className="text-lg font-semibold">Email</label>
                <p className="text-lg text-muted-foreground">
                  {profile?.email}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-lg font-semibold">Registered at</label>
                <p className="text-lg text-muted-foreground">
                  {dayjs(profile?.registeredAt).format("YYYY/MM/DD")}
                </p>
              </div>
              <div className="grow" />
              <div className="flex justify-end w-full">
                <Button
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => logoutFromAllDevices()}
                >
                  Log out of all devices
                </Button>
                <Button variant="ghost" onClick={() => logout()}>
                  Log out
                </Button>
              </div>
            </div>
          ) : (
            <ChangePasswordTab />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
