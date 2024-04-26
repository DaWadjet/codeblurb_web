import useUsername from "@/hooks/useUsername";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { cn } from "@/shadcnutils";
import { FC, useMemo } from "react";

const UserAvatar: FC<{ className?: string }> = ({ className }) => {
  const userName = useUsername();

  const userMonogram = useMemo(() => {
    const splitted = userName.split(" ");
    if (splitted.length === 1) return splitted[0].slice(0, 2).toUpperCase();
    return (splitted[0][0] + splitted[1][0]).toUpperCase();
  }, [userName]);

  return (
    <Avatar className={cn("size-9", className)}>
      <AvatarImage alt={userName} />
      <AvatarFallback>{userMonogram}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
