"use client";

import { useEffect } from "react";

/**
 * Triggers `onChange` when another browser tab instance mutates the LS value.
 */
export const useWatchLocalStorageValue = ({
  key: watchKey,
  onChange,
}: {
  key: string;
  onChange(newValue: string | null): void;
}) => {
  useEffect(() => {
    function handleStorageChange({ key, newValue }: StorageEvent) {
      if (key === watchKey) onChange(newValue);
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [onChange, watchKey]);
};
