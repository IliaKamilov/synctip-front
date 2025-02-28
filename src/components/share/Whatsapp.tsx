/**
 * @file src\components\share\Whatsapp.tsx
 * @description Whatsapp send shift details
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

import { useEmployeeState, useShiftState } from "@/store/zustand";
import Link from "next/link";
import pkg from "../../../package.json";
import {
  calcAvgTips,
  calcHours,
  calcPerHour,
  calcWage,
  toILS,
} from "@/utils/number";
import { generateID } from "../report";

const WhatsappShare = () => {
  const { items: employees } = useEmployeeState();
  const { data: shift } = useShiftState();

  const appUrl = "synctip.com";
  const date = new Date(shift.date);
  const dateStr = date.toLocaleDateString("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const tips = shift.tips;
  const totalHours = calcHours(employees.map((e) => e.hours));
  const perHour = calcPerHour(totalHours, tips);
  const avgTips = calcAvgTips(tips, shift.total).toFixed(1);

  const teamTxt = employees
    .map(
      (e) =>
        `- *${e.name}* - ${e.hours.toFixed(2)} \`${toILS(
          calcWage(perHour, e.hours),
        )}\``,
    )
    .join("\n\n");

  const rtlMark = "\u200F";

  const message = `
Synctip ${pkg.version} © ${new Date().getFullYear()}
${appUrl}

*תאריך*
> *${dateStr}*

*קופה* 
> ${toILS(shift.total, 0)}

*טיפים* 
> ${toILS(shift.tips, 0)} \`${avgTips}%\`

*שעות* 
> ${rtlMark}${totalHours.toFixed(2)}

*לשעה*
> ${toILS(perHour, 1)}

*צוות* (${employees.length})

${teamTxt}

*מזהה* 
> ${generateID()}
\n`;
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300"
    >
      הפצה
    </Link>
  );
};

export default WhatsappShare;
