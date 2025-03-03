import { createTheme } from "@/helpers/create-theme";
import { DrawerTheme } from "./Drawer";

export const drawerTheme: DrawerTheme = createTheme({
  root: {
    base: "fixed",
    position: {
      bottom: "bottom-0 left-0 w-full",
      left: "top-0 left-0 h-full",
      right: "top-0 right-0 h-full",
      top: "top-0 left-0 w-full",
    },
  },
});
