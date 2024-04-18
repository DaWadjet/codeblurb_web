import { useRequestResetPasswordMutation } from "@/network/auth";
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
import { z } from "zod";

const usernameSchema = z.object({
  username: z.string().min(1),
});

const ForgotPasswordPage: FC = () => {
  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  const { isPending, mutate } = useRequestResetPasswordMutation();
  const onSubmit = useCallback(
    (values: z.infer<typeof usernameSchema>) => {
      mutate(values.username);
    },
    [mutate]
  );

  return (
    <div className="mx-52 my-20 flex flex-col gap-2 items-center">
      <Card className="self-stretch">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Send Reset Email</CardTitle>
              <CardDescription>
                Enter your username where so we can send you a magic link!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="john_doe" />
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
                Send Reset Email
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
