import { Button } from "@/shadcn/ui/button";
import { Input, InputProps } from "@/shadcn/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef } from "react";
import { useToggle } from "react-use";

const PasswordField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [isVisible, toggleVisible] = useToggle(false);

  return (
    <div className="relative">
      <Input ref={ref} {...props} type={isVisible ? "text" : "password"} />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:text-muted-foreground"
        onClick={toggleVisible}
      >
        {!isVisible ? (
          <EyeIcon className="size-5" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="size-5" aria-hidden="true" />
        )}
        <span className="sr-only">
          {isVisible ? "Hide password" : "Show password"}
        </span>
      </Button>
      <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
    </div>
  );
});

export default PasswordField;
