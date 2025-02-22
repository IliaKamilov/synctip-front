/**
 * @file src\utils\faker\util.ts
 * @description FakerJS utility functions
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

import { fakerHE as faker } from "@faker-js/faker";

export const fakeNumber = (min: number = 1, max: number = 9999): number => {
  return Math.random() * (max - min + 1) + min;
};

export const fakeTips = (total: number = fakeNumber()) => {
  const percentage = [10, 12, 15, 18, 20];
  return Math.floor(
    total * (percentage[Math.floor(Math.random() * percentage.length)] / 100),
  );
};

export const fakeEmployee = () => {
  return {
    id: faker.database.mongodbObjectId(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
    hours: fakeNumber(3, 12),
  };
};

export const fakeEmployees = (total: number = fakeNumber(1, 10)) => {
  return Array.from({ length: total }, () => fakeEmployee());
};
