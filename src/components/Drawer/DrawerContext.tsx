"use client";

import { createContext, useContext } from "react";
import { DrawerTheme } from "./Drawer";

type DrawerContext = {
  theme: DrawerTheme;
  setOpen: (open: boolean) => void;
  open?: boolean;
};

export const DrawerContext = createContext<DrawerContext | undefined>(
  undefined,
);

export function useDrawerContext(): DrawerContext {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error("useDrawerContext must be used within a DrawerProvider");
  }

  return context;
}
