/**
 * @file src\components\summary\Shift.tsx
 * @description Shift summary component
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

import {
  useEmployeeState,
  usePreferenceState,
  useShiftState,
} from "@/store/zustand";
import { calcHours, calcPerHour, toILS } from "@/utils/number";
import { parseDecimalToTime } from "@/utils/time";
import WhatsappShare from "../share/Whatsapp";

const ShiftSummary = () => {
  const { data: preference } = usePreferenceState();
  const { data: details } = useShiftState();
  const { items: employees } = useEmployeeState();

  const totalHours = calcHours(employees.map((e) => e.hours));
  const perHour = calcPerHour(totalHours, details.tips);

  return (
    <div className="flex flex-col gap-2 justify-between flex-wrap">
      <div>קופה: {toILS(details.total, 0)}</div>
      <div>
        טיפים: {toILS(details.tips, 0)}
        {details.total > 0 && (
          <span className="text-sm text-gray-500">
            ({((details.tips / details.total) * 100).toFixed(1)}%)
          </span>
        )}
      </div>
      <div>אנשי צוות: {employees.length}</div>
      <div>
        שעות:{" "}
        {preference.time === "decimal"
          ? totalHours.toFixed(2)
          : parseDecimalToTime(totalHours)}
      </div>
      <div>לשעה: {toILS(perHour || 0)}</div>
      <div>
        <WhatsappShare />
      </div>
    </div>
  );
};

export default ShiftSummary;
