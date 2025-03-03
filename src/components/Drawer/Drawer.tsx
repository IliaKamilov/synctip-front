"use client";
import { mergeDeep } from "@/helpers/merge-deep";
import { getTheme } from "@/store/theme";
import { DeepPartial } from "@/types";
import { ComponentProps, FC, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { DrawerContext } from "./DrawerContext";
import { Button } from "../Button";
import { Bar2 } from "../Icon/Bar2";

type Position = "top" | "left" | "right" | "bottom";

export interface DrawerTheme {
  root: DrawerRootTheme;
}

export interface DrawerRootTheme {
  base: string;
  position: {
    [K in Position]: string;
  };
}

export interface DrawerProps extends ComponentProps<"div"> {
  open?: boolean;
  onOpen?: (open: boolean) => void;
  theme?: DeepPartial<DrawerTheme>;
  position?: Position;
  screen?: boolean;
  label?: string;
}

const DrawerComponent: FC<DrawerProps> = ({
  children,
  open: isOpen = false,
  className,
  theme: customTheme = {},
  position: initPosition = "bottom",
  screen,
  label,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && contentRef.current) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  });

  const handleClickOutside = (e: MouseEvent) => {
    if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  const theme = mergeDeep(getTheme().drawer, customTheme);

  const positionClasses = {
    top: open ? "translate-y-0" : "-translate-y-full",
    bottom: open ? "translate-y-0" : "translate-y-full",
    left: open ? "translate-x-0" : "-translate-x-full",
    right: open ? "translate-x-0" : "translate-x-full",
  };

  return (
    <DrawerContext.Provider value={{ open, setOpen: setOpen, theme }}>
      <Button onClick={() => setOpen(true)} className="p-2">
        <Bar2
          width={56}
          height={56}
          className="p-4 transition-transform duration-100"
        />
      </Button>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-gray-900 transition-opacity duration-100 ${open ? "opacity-50" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        ref={contentRef}
        className={twMerge(
          theme.root.base,
          theme.root.position[initPosition],
          className,
          screen ? "w-full h-full" : "",
          "fixed z-50 transition-transform duration-100 ease-in-out",
          positionClasses[initPosition],
        )}
        {...props}
      >
        <div className="flex text-gray-500 text-sm font-semibold w-full items-center justify-center p-4 rounded-t-full border-t-transparent bg-white dark:bg-gray-800 border-b-white">
          {label}
        </div>
        <div className="bg-white dark:bg-gray-800">{children}</div>
      </div>
    </DrawerContext.Provider>
  );
};

DrawerComponent.displayName = "Drawer";

export const Drawer = Object.assign(DrawerComponent, {});
