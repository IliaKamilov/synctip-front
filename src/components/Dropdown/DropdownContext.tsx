"use client";

import { createContext, useContext } from "react";
import type { DropdownTheme } from "./Dropdown";

type DropdownContext = {
  theme: DropdownTheme;
  open?: boolean;
  setOpen: (open: boolean) => void;
};

export const DropdownContext = createContext<DropdownContext | undefined>(
  undefined,
);

export function useDropdownContext(): DropdownContext {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(
      "useDropdownContext should be used within the DropdownContext provider!",
    );
  }

  return context;
}
