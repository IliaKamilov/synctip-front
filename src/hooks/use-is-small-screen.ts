"use client";
import { useMediaQuery } from "@uidotdev/usehooks";

export function useIsSmallScreen() {
  const isSmallScreen = useMediaQuery("only screen and (max-width : 768px)");

  return isSmallScreen;
}
