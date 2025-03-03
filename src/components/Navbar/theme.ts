import { createTheme } from "@/helpers/create-theme";
import { NavbarTheme } from "./Navbar";

export const navbarTheme: NavbarTheme = createTheme({
  root: {
    base: "w-full flex flex-row items-center justify-between bg-white dark:bg-gray-900 text-black dark:text-white",
  },
  brand: {
    base: "p-4",
  },
});
