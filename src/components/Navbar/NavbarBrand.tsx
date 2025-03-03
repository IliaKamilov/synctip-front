import { DeepPartial } from "@/types";
import { ComponentProps, ElementType, FC } from "react";
import { useNavbarContext } from "./NavbarContext";
import { mergeDeep } from "@/helpers/merge-deep";
import { twMerge } from "tailwind-merge";

export interface NavbarBrandTheme {
  base: string;
}

export interface NavbarBrandProps
  extends ComponentProps<"a">,
    Record<string, unknown> {
  as?: ElementType;
  href?: string;
  theme?: DeepPartial<NavbarBrandTheme>;
}

export const NavbarBrand: FC<NavbarBrandProps> = ({
  as: Component = "a",
  children,
  className,
  theme: customTheme = {},
  ...props
}) => {
  const { theme: rootTheme } = useNavbarContext();

  const theme = mergeDeep(rootTheme.brand, customTheme);

  return (
    <Component className={twMerge(theme.base, className)} {...props}>
      {children}
    </Component>
  );
};
