"use client";
import { mergeDeep } from "@/helpers/merge-deep";
import { getTheme } from "@/store/theme";
import { DeepPartial } from "@/types";
import { ComponentProps, FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import { NavbarContext } from "./NavbarContext";
import { NavbarBrand, NavbarBrandTheme } from "./NavbarBrand";

export interface NavbarTheme {
  root: NavbarRootTheme;
  brand: NavbarBrandTheme;
}

export interface NavbarRootTheme {
  base: string;
}

export interface NavbarComponentProps extends ComponentProps<"nav"> {
  open?: boolean;
  theme?: DeepPartial<NavbarTheme>;
}

const NavbarComponent: FC<NavbarComponentProps> = ({
  open = false,
  theme: customTheme = {},
  className,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  const theme = mergeDeep(getTheme().navbar, customTheme);

  return (
    <NavbarContext.Provider value={{ theme, open: isOpen, setOpen: setIsOpen }}>
      <nav className={twMerge(theme.root.base, className)} {...props}>
        {children}
      </nav>
    </NavbarContext.Provider>
  );
};

NavbarComponent.displayName = "Navbar";

export const Navbar = Object.assign(NavbarComponent, {
  Brand: NavbarBrand,
});
