import { DeepPartial } from "@/types";
import { SynctipThemeToggle } from "../ThemeToggle";
import { SynctipCardTheme } from "../Card";
import { MoonIconTheme } from "../Icon/Moon";
import { SunIconTheme } from "../Icon/Sun";

export type CustomSynctipTheme = DeepPartial<SynctipTheme>;

export interface SynctipTheme {
  card: SynctipCardTheme;
  theme: {
    toggle: SynctipThemeToggle;
  };
  icon: {
    moon: MoonIconTheme;
    sun: SunIconTheme;
  };
}
