import PasswordField from "@/components/common/PasswordField";
import { useRegistrationMutation } from "@/network/auth";
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

const signupSchema = z
  .object({
    username: z.string().min(4, {
      message: "Username must be at least 4 characters",
    }),
    email: z.string().email({
      message: "Invalid email",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpPage: FC = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
  });

  const { mutate: register, isPending } = useRegistrationMutation();

  const onSubmit = useCallback(
    (values: z.infer<typeof signupSchema>) => {
      if (!isPending) register(values);
    },
    [register, isPending]
  );
  return (
    <div className="mx-52 justify-center flex flex-col gap-2 items-center my-20">
      <Card className="self-stretch">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Welcome to CodeBlurb!</CardTitle>
              <CardDescription>
                Let's get you started by creating an account.
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
                      <Input
                        placeholder="john_doe"
                        {...field}
                        data-test="register-username-field"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} data-test="register-email-field" />
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
                      <PasswordField
                        {...field}
                        data-test="register-password-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordField
                        {...field}
                        data-test="register-confirm-password-field"
                      />
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
              <Button type="submit" data-test="register-submit-button">
                {isPending && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign Up
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      <p className="text-muted-foreground">
        Already have an account?{" "}
        <Button
          data-test="register-already-have-account-button"
          disabled={isPending}
          variant="link"
          className="text-muted-foreground hover:text-primary text-base"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </p>
    </div>
  );
};

export default SignUpPage;
