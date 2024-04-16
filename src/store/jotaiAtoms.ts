import { AlertDialogContent } from "@radix-ui/react-alert-dialog";
import { atom } from "jotai";

type AlertDialogContent = {
  title: string;
  message: string;
  onConfirm: () => void;
};

export const alertDialogAtom = atom<AlertDialogContent | null>(null);
