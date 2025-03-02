import { DeepPartial } from "@/types";
import { SynctipCardTheme } from "../Card/Card";

export type CustomSynctipTheme = DeepPartial<SynctipTheme>;

export interface SynctipTheme {
  card: SynctipCardTheme;
}
