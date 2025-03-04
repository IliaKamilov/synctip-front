import { createTheme } from "@/helpers/create-theme";
import { SynctipCardTheme } from "./Card";

export const cardTheme: SynctipCardTheme = createTheme({
  root: {
    base: "flex border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800",
  },
});
