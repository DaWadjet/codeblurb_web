import UserAvatar from "@/components/common/UserAvatar";
import useItemsInCart from "@/hooks/useItemsInCart";
import useUsername from "@/hooks/useUsername";
import { useLogoutMutation } from "@/network/auth";
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
import { ShoppingCart } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const NavbarLoggedIn: FC = () => {
  const navigate = useNavigate();
  const username = useUsername();
  const itemsInCart = useItemsInCart();
  const { mutate: logout } = useLogoutMutation();

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

      <Button
        variant="outline"
        className="rounded-full relative size-9 p-2"
        onClick={() => navigate("/shopping-cart")}
      >
        <ShoppingCart className="text-foreground" />
        {itemsInCart.length > 0 && (
          <div className="absolute -top-1.5 -right-1.5 shrink-0 rounded-full bg-foreground size-4 flex items-center justify-center text-xs leading-none text-background font-bold">
            {itemsInCart.length}
          </div>
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <UserAvatar />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40"
          align="end"
          sideOffset={20}
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <p className="text-base font-medium leading-none">{username}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarLoggedIn;
