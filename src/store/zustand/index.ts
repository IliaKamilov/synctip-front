/**
 * @file src\store\zustand\index.ts
 * @description Zustand store service
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

import { Employee } from "@/types/employee";
import { create } from "zustand";

interface EmployeeState {
  items: Employee[];
  add: (payload: Omit<Employee, "id">) => void;
  remove: (id: string) => void;
}

export const useEmployeeState = create<EmployeeState>((set) => ({
  items: [],
  add: (payload) => {
    set((state) => ({
      items: [...state.items, { ...payload, id: `E${state.items.length}` }],
    }));
  },
  remove: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));

interface Shift {
  date: number;
  total: number;
  tips: number;
}

interface ShiftState {
  data: Shift;
  update: (payload: Partial<Shift>) => void;
}

export const useShiftState = create<ShiftState>((set) => ({
  data: {
    date: new Date().getTime(),
    total: 0,
    tips: 0,
  },
  update: (payload) =>
    set((state) => ({ data: { ...state.data, ...payload } })),
}));

interface Preference {
  time: "decimal" | "hourly";
}

interface PreferenceState {
  data: Preference;
  update: (payload: Partial<Preference>) => void;
}

export const usePreferenceState = create<PreferenceState>((set) => ({
  data: { time: "hourly" },
  update: (payload: Partial<Preference>) =>
    set((state) => ({ data: { ...state.data, ...payload } })),
}));
