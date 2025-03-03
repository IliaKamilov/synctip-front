import { createTheme } from "@/helpers/create-theme";
import type { SynctipThemeToggle } from "./ThemeToggle";

export const themeToggleTheme: SynctipThemeToggle = createTheme({
  root: {
    base: "p-2",
    icon: "h-5 w-5",
  },
});
