import { CustomSynctipTheme, SynctipTheme } from "@/components/Synctip";
import { cloneDeep } from "@/helpers/clone-deep";
import { mergeDeep } from "@/helpers/merge-deep";
import { ThemeMode } from "@/hooks/use-theme-mode";
import { theme as defaultTheme } from "@/theme";

interface ThemeStore {
  mode?: ThemeMode;
  theme: SynctipTheme;
}

const store: ThemeStore = {
  theme: cloneDeep(defaultTheme),
};

export function setThemeMode(mode?: ThemeMode) {
  store.mode = mode;
}

export function getThemeMode(): ThemeMode | undefined {
  return store.mode;
}

export function setTheme(theme?: CustomSynctipTheme) {
  if (theme) store.theme = mergeDeep(defaultTheme, theme);
}

export function getTheme(): SynctipTheme {
  return cloneDeep(store.theme);
}
