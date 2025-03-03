import { mergeDeep } from "@/helpers/merge-deep";
import { getTheme } from "@/store/theme";
import { DeepPartial } from "@/types";
import { FC } from "react";
import Image, { ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";

export interface AvatarTheme {
  root: AvatarRootTheme;
}

export interface AvatarRootTheme {
  base: string;
}

export interface AvatarProps extends Partial<ImageProps> {
  theme?: DeepPartial<AvatarTheme>;
}

const AvatarComponent: FC<AvatarProps> = ({
  className,
  theme: customTheme = {},
  src,
  alt,
  ...props
}) => {
  const theme = mergeDeep(getTheme().avatar, customTheme);

  return (
    <Image
      alt={alt || "Avatar"}
      src={src || "/logo58.png"}
      width={32}
      height={32}
      className={twMerge(theme.root.base, className, "size-12")}
      {...props}
    />
  );
};

AvatarComponent.displayName = "Avatar";

export const Avatar = Object.assign(AvatarComponent, {});
