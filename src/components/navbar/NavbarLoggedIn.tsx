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
import { cn } from "@/shadcnutils";
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
      <Button
        variant="link"
        onClick={() => navigate("/home")}
        data-test="navbar-home-button"
      >
        Home
      </Button>
      <Button
        variant="link"
        onClick={() => navigate("/explore")}
        data-test="navbar-explore-button"
      >
        Explore
      </Button>
      <Button
        variant="link"
        onClick={() => navigate("/my-courses")}
        data-test="navbar-my-courses-button"
      >
        My Courses
      </Button>

      <Button
        variant="outline"
        className="rounded-full relative size-9 p-2"
        onClick={() => navigate("/shopping-cart")}
        data-test="navbar-shopping-cart-button"
      >
        <ShoppingCart className="text-foreground" />
        {itemsInCart.length > 0 && (
          <div
            className={cn(
              "absolute -top-1.5 -right-1.5 shrink-0 rounded-full bg-foreground size-4 flex items-center justify-center leading-none text-background font-bold",
              itemsInCart.length > 9 ? "text-[10px]" : "text-xs"
            )}
          >
            {itemsInCart.length > 9 ? "9+" : itemsInCart.length}
          </div>
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild data-test="navbar-profile-dropdown">
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
            <DropdownMenuItem
              onClick={() => navigate("/profile")}
              data-test="navbar-profile-button"
            >
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => logout()}
            data-test="navbar-logout-button"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavbarLoggedIn;
