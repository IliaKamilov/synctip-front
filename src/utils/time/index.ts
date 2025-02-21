/**
 * @file src\utils\time\index.ts
 * @description Time utility functions
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

export const parseTimeToDecimal = (str: string): number => {
  if (!str) return 0;

  if (str && str.includes(":")) {
    const [hours, minutes] = str.split(":").map(Number);
    return hours + minutes / 60;
  }

  return Number(str);
};

export const parseDecimalToTime = (str: string): string => {
  if (!str) return "";

  const num = Number(str);

  if (isNaN(num)) return "NaN";

  const hours = Math.floor(num);
  const minutes = Math.floor((num - hours) * 60);

  const time = `${hours.toString()}:${minutes.toString().padStart(2, "0")}`;

  return time;
};

export const extractTime = (input: string): [string, string | null] => {
  const regex = /\b\d{1,2}([:.]\d{1,2})?\b/;

  const match = input.match(regex);

  if (!match) return [input, null];

  const time = match[0];
  const text = input.replace(regex, "").trim();

  return [text, time];
};
