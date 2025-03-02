import { CustomSynctipTheme, SynctipTheme } from "@/components/Synctip";
import { cloneDeep } from "@/helpers/clone-deep";
import { mergeDeep } from "@/helpers/merge-deep";
import { theme as defaultTheme } from "@/theme";

interface ThemeStore {
  mode?: string;
  theme: SynctipTheme;
}

const store: ThemeStore = {
  theme: cloneDeep(defaultTheme),
};

export function setTheme(theme?: CustomSynctipTheme) {
  if (theme) store.theme = mergeDeep(defaultTheme, theme);
}

export function getTheme(): SynctipTheme {
  return cloneDeep(store.theme);
}
