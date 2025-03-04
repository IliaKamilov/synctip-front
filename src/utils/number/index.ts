/**
 * @file src\utils\number\index.ts
 * @description Number utilities
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

import Big from "big.js";

export const toILS = (
  num: number,
  maximumFractionDigits: number = 2,
): string => {
  return Number(num).toLocaleString("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: maximumFractionDigits,
  });
};

export const calcPerHour = (hours: number, tips: number): number => {
  if (!hours || !tips) return 0;
  return Big(tips).div(hours).toNumber();
};

export const calcHours = (records: number[]): number => {
  if (records.length === 0) return 0;
  return records
    .reduce((total, record) => total.plus(record), Big(0))
    .toNumber();
};

export const calcWage = (perhour: number, hours: number): number => {
  if (!perhour || !hours) return 0;
  return Big(perhour).times(hours).toNumber();
};

export const calcAvgTips = (tips: number, total: number): number => {
  if (!tips || !total) return 0;
  return (tips / total) * 100;
};
