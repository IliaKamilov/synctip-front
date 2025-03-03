import { mergeDeep } from "@/helpers/merge-deep";
import { getTheme } from "@/store/theme";
import { DeepPartial } from "@/types";
import { ComponentProps, FC, Fragment, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ModalContext } from "./ModalContext";
import { useEffect } from "react";

export interface ModalTheme {
  root: ModalRootTheme;
}

export interface ModalRootTheme {
  base: string;
}

export interface ModalProps extends ComponentProps<"div"> {
  theme?: DeepPartial<ModalTheme>;
  open?: boolean;
  onClose?: () => void;
}

const ModalComponent: FC<ModalProps> = ({
  children,
  className,
  theme: customTheme = {},
  open: isOpen = false,
  onClose: onClose = () => {},
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
    if (contentRef.current && !contentRef.current.contains(e.target as Node))
      return handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const theme = mergeDeep(getTheme().modal, customTheme);

  return (
    <ModalContext.Provider value={{ theme, open, setOpen }}>
      <div
        className={twMerge(
          theme.root.base,
          className,
          "fixed inset-0 flex items-center justify-center",
        )}
        {...props}
      >
        {open && (
          <Fragment>
            <div
              onClick={handleClose}
              className={`fixed inset-0 bg-black transition-opacity duration-100 ${open ? "opacity-50" : "opacity-0 pointer-events-none"}`}
            />
            <div
              ref={contentRef}
              className="fixed min-w-[80%] z-50 transition-transform duration-100 ease-in-out bg-white dark:bg-gray-800"
            >
              {children}
            </div>
          </Fragment>
        )}
      </div>
    </ModalContext.Provider>
  );
};

ModalComponent.displayName = "Modal";

export const Modal = Object.assign(ModalComponent, {});
