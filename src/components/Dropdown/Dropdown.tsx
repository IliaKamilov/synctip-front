"use client";
import { mergeDeep } from "@/helpers/merge-deep";
import { DeepPartial } from "@/types";
import { ComponentProps, ElementType, FC, useRef, useState } from "react";
import { DropdownContext } from "./DropdownContext";
import { getTheme } from "@/store/theme";
import { twMerge } from "tailwind-merge";
import { DropdownTrigger, DropdownTriggerTheme } from "./DropdownTrigger";
import { DropdownItem, DropdownItemTheme } from "./DropdownItem";
import { FloatingFocusManager, FloatingList } from "@floating-ui/react";
import { useBaseFloating } from "@/hooks/use-floating";
import { FloatingTheme } from "../Floating/Floating";

export interface DropdownTheme {
  content: string;
  trigger: DropdownTriggerTheme;
  item: DropdownItemTheme;
  floating: FloatingTheme;
}

export interface DropdownProps extends ComponentProps<"div"> {
  open?: boolean;
  theme?: DeepPartial<DropdownTheme>;
  trigger?: ElementType;
}

const DropdownComponent: FC<DropdownProps> = ({
  className,
  children,
  theme: customTheme = {},
  open: isOpen = false,
  trigger: TriggerComponent = DropdownTrigger,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  const elementsRef = useRef<Array<HTMLElement | null>>([]);

  const theme = mergeDeep(getTheme().dropdown, customTheme);

  const { context, refs } = useBaseFloating<HTMLButtonElement>({
    open,
    setOpen,
    placement: "right-end",
  });
  return (
    <DropdownContext.Provider value={{ theme, open, setOpen }}>
      <TriggerComponent onClick={() => setOpen(!open)} />
      {open && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            className={twMerge(theme.floating.base, className)}
            {...props}
          >
            <FloatingList elementsRef={elementsRef}>
              <ul className={theme.content}>{children}</ul>
            </FloatingList>
          </div>
        </FloatingFocusManager>
      )}
    </DropdownContext.Provider>
  );
};

DropdownComponent.displayName = "Dropdown";

export const Dropdown = Object.assign(DropdownComponent, {
  Item: DropdownItem,
});
