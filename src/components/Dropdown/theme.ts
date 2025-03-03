import { createTheme } from "@/helpers/create-theme";
import { DropdownTheme } from "./Dropdown";

export const dropdownTheme: DropdownTheme = createTheme({
  content: "py-1 focus:outline-none",
  trigger: {
    base: "p-4",
  },
  item: {
    base: "py-4 px-8",
    container: "",
  },
  floating: {
    base: "",
  },
});
