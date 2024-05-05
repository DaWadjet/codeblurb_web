import PasswordField from "@/components/common/PasswordField";
import { useChangePasswordMutation } from "@/network/auth";
import { Button } from "@/shadcn/ui/button";
import { CardFooter } from "@/shadcn/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/ui/form";
import { ScrollArea } from "@/shadcn/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    oldPassword: z.string().min(1, {
      message: "Old password is required",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmNewPassword: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from old password",
    path: ["newPassword"],
  });

const ChangePasswordTab: FC = () => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
      oldPassword: "",
    },
  });
  const { isPending, mutateAsync } = useChangePasswordMutation();

  const onSubmit = useCallback(
    async (values: z.infer<typeof resetPasswordSchema>) => {
      const result = await mutateAsync({
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      });
      if (result.status === 200) {
        form.reset();
      }
    },
    [mutateAsync, form]
  );

  return (
    <ScrollArea className="overflow-y-auto h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-6 flex flex-col w-full overflow-y-auto p-1 h-full"
        >
          <h3 className="font-semibold text-3xl mb-6">Change Password</h3>
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <PasswordField {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
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
            name="confirmNewPassword"
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
          <div className="grow" />
          <CardFooter className="flex justify-end p-0">
            <Button type="submit">
              {isPending && <Loader2Icon className="h-4 w-4 animate-spin" />}
              Change Password
            </Button>
          </CardFooter>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default ChangePasswordTab;
