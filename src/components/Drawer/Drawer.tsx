"use client";
import { mergeDeep } from "@/helpers/merge-deep";
import { getTheme } from "@/store/theme";
import { DeepPartial } from "@/types";
import { ComponentProps, FC, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { DrawerContext } from "./DrawerContext";
import { Button } from "../Button";
import { Bar2 } from "../Icon/Bar2";
import { Chevron, ChevronProps } from "../Icon/Chevron";

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

  const toggleOpen = () => setOpen(!open);

  const chevronDirection = (): ChevronProps["direction"] => {
    switch (initPosition) {
      case "top":
        return "up";
      case "bottom":
        return "down";
      case "left":
        return "right";
      case "right":
        return "left";
      default:
        return initPosition;
    }
  };

  return (
    <DrawerContext.Provider value={{ open, setOpen: setOpen, theme }}>
      <Button onClick={toggleOpen} className="">
        {open ? (
          <Chevron
            direction={chevronDirection()}
            width={56}
            height={56}
            className="p-4 transition-transform duration-500"
          />
        ) : (
          <Bar2
            width={56}
            height={56}
            className="p-4 transition-transform duration-500"
          />
        )}
      </Button>
      {open && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-15">
            backdrop
          </div>
          <div
            ref={contentRef}
            className={twMerge(
              theme.root.base,
              theme.root.position[initPosition],
              className,
              screen ? "w-full h-full" : "",
            )}
            {...props}
          >
            <div className="flex text-sm font-semibold w-full items-center justify-center p-4 rounded-t-full border-t-transparent bg-white border-b">
              {label}
            </div>
            <div className="bg-white dark:bg-gray-600">{children}</div>
          </div>
        </>
      )}
    </DrawerContext.Provider>
  );
};

DrawerComponent.displayName = "Drawer";

export const Drawer = Object.assign(DrawerComponent, {});
