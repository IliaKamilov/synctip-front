import {
  toILS,
  calcPerHour,
  calcHours,
  calcWage,
  calcAvgTips,
} from "@/utils/number";
import { fakeNumber } from "../faker/util";

describe("Number Utilities", () => {
  test("toILS should format number to ILS currency", () => {
    const num = fakeNumber();
    const ils = num.toLocaleString("he-IL", {
      style: "currency",
      currency: "ILS",
      maximumFractionDigits: 2,
    });
    expect(toILS(num)).toBe(ils);

    const num2 = fakeNumber();
    const ils2 = num2.toLocaleString("he-IL", {
      style: "currency",
      currency: "ILS",
      maximumFractionDigits: 1,
    });

    expect(toILS(num2, 1)).toBe(ils2);
  });

  test("calcPerHour should return correct per-hour calculation", () => {
    expect(calcPerHour(10, 500)).toBe(50);
    expect(calcPerHour(0, 500)).toBe(0);
    expect(calcPerHour(5, 0)).toBe(0);
  });

  test("calcHours should sum up an array of records", () => {
    expect(calcHours([2, 2, 1, 5])).toBe(10);
    expect(calcHours([])).toBe(0);
    expect(calcHours([1.5, 2.5, 3.5])).toBe(7.5);
  });

  test("calcWage should multiply per-hour rate by hours worked", () => {
    expect(calcWage(50, 8)).toBe(400);
    expect(calcWage(0, 8)).toBe(0);
    expect(calcWage(50, 0)).toBe(0);
  });

  test("calcAvgTips should return correct percentage", () => {
    expect(calcAvgTips(100, 500)).toBe(20);
    expect(calcAvgTips(0, 500)).toBe(0);
    expect(calcAvgTips(100, 0)).toBe(0);
  });
});
