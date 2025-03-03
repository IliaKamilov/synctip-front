"use client";

import { createContext, useContext } from "react";
import { NavbarTheme } from "./Navbar";

type NavbarContext = {
  theme: NavbarTheme;
  setOpen: (open: boolean) => void;
  open?: boolean;
};

export const NavbarContext = createContext<NavbarContext | undefined>(
  undefined,
);

export function useNavbarContext(): NavbarContext {
  const context = useContext(NavbarContext);

  if (!context) {
    throw new Error("useNavbarContext must be used within a NavbarProvider");
  }

  return context;
}
