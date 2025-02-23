/**
 * @file src\components\list\employees\Item.tsx
 * @description Employees List Item Component
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 23/02/2025
 * @license MIT
 * @version 0.0.1
 */

import { usePreferenceState } from "@/store/zustand";
import { Employee } from "@/types/employee";
import { toILS } from "@/utils/number";
import { parseDecimalToTime } from "@/utils/time";
import Image from "next/image";

type EmployeeItemProps = {
  employee: Employee & {
    perHour: number;
  };
};

const EmployeeItem = (props: EmployeeItemProps) => {
  const { employee } = props;
  const { data: preference } = usePreferenceState();

  return (
    <div className="flex items-center space-x-4 rtl:space-x-reverse">
      <div className="shrink-0">
        {employee.image ? (
          <Image
            width={24}
            height={24}
            className="w-8 h-8 rounded-full"
            src={employee.image}
            alt={employee.name}
            loading="lazy"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={0.9}
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
          {employee.name}
        </p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          {preference.time === "decimal"
            ? employee.hours.toFixed(2)
            : parseDecimalToTime(employee.hours)}
        </p>
      </div>
      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
        {toILS(employee.perHour)}
      </div>
    </div>
  );
};

export default EmployeeItem;
