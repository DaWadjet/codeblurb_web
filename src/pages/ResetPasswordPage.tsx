import PasswordField from "@/components/common/PasswordField";
import { useResetPasswordMutation } from "@/network/auth";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import qs from "qs";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z.string().min(1, {
      message: "Password is required",
    }),
    confirmPassword: z.string().min(1, {
      message: "Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPasswordPage: FC = () => {
  const { token } = qs.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  }) as { token: string };

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { isPending, mutate } = useResetPasswordMutation();

  const onSubmit = useCallback(
    (values: z.infer<typeof resetPasswordSchema>) => {
      mutate({
        token,
        newPassword: values.password,
      });
    },
    [mutate, token]
  );

  return (
    <div className="mx-52 my-20 flex flex-col gap-2 items-center">
      <Card className="self-stretch">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>Enter your new password below.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordField {...field} />
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
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <PasswordField {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit">
                {isPending && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Reset Password
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
