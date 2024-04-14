import { useLogoutMutation } from "@/network/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import { Button } from "@/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import useTokenStore from "@/store/tokenStore";
import { FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const NavbarLoggedIn: FC = () => {
  const navigate = useNavigate();
  const { mutate: logout } = useLogoutMutation();
  const userName = useTokenStore(useCallback((state) => state.username!, []));

  const userMonogram = useMemo(() => {
    const splitted = userName.split(" ");
    if (splitted.length === 1) return splitted[0].slice(0, 2).toUpperCase();
    return (splitted[0][0] + splitted[1][0]).toUpperCase();
  }, [userName]);

  return (
    <div className="flex gap-6 items-center">
      <Button variant="link" onClick={() => navigate("/home")}>
        Home
      </Button>
      <Button variant="link" onClick={() => navigate("/explore")}>
        Explore
      </Button>
      <Button variant="link" onClick={() => navigate("/my-courses")}>
        My Courses
      </Button>

      <Button variant="link" onClick={() => navigate("/shopping-cart")}>
        Cart
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src="TODO" alt={userName} />
              <AvatarFallback className="text-muted-foreground hover:text-primary active:text-primary">
                {userMonogram}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40 dark"
          align="end"
          sideOffset={20}
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <p className="text-base font-medium leading-none">{userName}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarLoggedIn;
