import { DeepPartial } from "@/types";
import { ComponentProps, ElementType, FC } from "react";
import { DropdownTheme } from "./Dropdown";
import { mergeDeep } from "@/helpers/merge-deep";
import { getTheme } from "@/store/theme";
import { twMerge } from "tailwind-merge";

export interface DropdownItemTheme {
  base: string;
  container: string;
}

export interface DropdownItemProps extends ComponentProps<"button"> {
  theme?: DeepPartial<DropdownTheme>;
  as?: ElementType;
}

export const DropdownItem: FC<DropdownItemProps> = ({
  className,
  children,
  as: Component = "button",
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(getTheme().dropdown.item, customTheme);
  return (
    <li role="menuitem" className={theme.container}>
      <Component className={twMerge(theme.base, className)} {...props}>
        {children}
      </Component>
    </li>
  );
};
