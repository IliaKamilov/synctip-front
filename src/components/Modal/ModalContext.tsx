import { createContext, useContext } from "react";
import { ModalTheme } from "./Modal";

export type ModalContext = {
  theme: ModalTheme;
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

export const ModalContext = createContext<ModalContext | undefined>(undefined);

export function useModalContext(): ModalContext {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }

  return context;
}
