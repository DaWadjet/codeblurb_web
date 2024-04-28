import PasswordField from "@/components/common/PasswordField";
import { useLoginMutation } from "@/network/auth";
import { Button } from "@/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/ui/form";
import { Input } from "@/shadcn/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useLoginMutation();

  const onSubmit = useCallback(
    (values: z.infer<typeof loginSchema>) => {
      if (!isPending) login(values);
    },
    [login, isPending]
  );

  return (
    <div className="mx-52 my-20 flex flex-col gap-2 items-center">
      <Card className="self-stretch">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Welcome back to CodeBlurb!</CardTitle>
              <CardDescription>
                Continue your journey by logging in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="john_doe" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordField {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Button type="submit">
                {isPending && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Log In
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <div className="flex flex-col items-center">
        <p className="text-muted-foreground">
          Don't have an account?{" "}
          <Button
            variant="link"
            className="text-muted-foreground hover:text-primary text-base"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </p>
        <Button
          variant="link"
          className="text-muted-foreground hover:text-primary text-xs"
          onClick={() => navigate("/reset-password")}
        >
          Forgot password?
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
