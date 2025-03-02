import { setTheme } from "..";
import { CustomSynctipTheme } from "@/components/Synctip";

interface Props {
  theme?: CustomSynctipTheme;
}

export function ThemeServerInit({ theme }: Props) {
  setTheme(theme);

  return null;
}
