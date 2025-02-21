/**
 * @file src\components\report\index.ts
 * @description Report generate functions
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

export const generateID = (length: number = 12): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";

  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((x) => chars[x % chars.length])
    .join("");
};

export const cleanMessage = (message: string): string => {
  return message
    .split("\n") // Split by new lines
    .map((line) => line.trimEnd()) // Remove trailing spaces on each line
    .filter((line) => line.length > 0) // Remove empty lines
    .join("\n"); // Join back with new lines
};
