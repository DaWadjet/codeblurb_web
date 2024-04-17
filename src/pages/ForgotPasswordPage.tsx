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
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
});

const ForgotPasswordPage: FC = () => {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ["sendResetPasswordEmail"],
    mutationFn: async (data: z.infer<typeof emailSchema>) => {
      //TODO send email
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    meta: {
      successMessage: "Email sent! Check Your Inbox!",
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof emailSchema>) => {
      mutate(values);
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
                Enter your email where we can send you a magic link!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
