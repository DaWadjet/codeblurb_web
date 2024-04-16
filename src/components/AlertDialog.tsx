import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shadcn/ui/alert-dialog";
import { alertDialogAtom } from "@/store/jotaiAtoms";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";

const Dialog: FC = () => {
  const [dialog, setDialog] = useAtom(alertDialogAtom);
  const [open, setIsOpen] = useState(false);

  useEffect(() => {
    if (dialog !== null) {
      setIsOpen(true);
    }
  }, [dialog]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setIsOpen(false);
          setTimeout(() => setDialog(null), 400);
        }
      }}
    >
      <AlertDialogContent className="p-4">
        <AlertDialogHeader>
          <AlertDialogTitle>{dialog?.title}</AlertDialogTitle>
          <AlertDialogDescription>{dialog?.message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={dialog?.onConfirm}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Dialog;
