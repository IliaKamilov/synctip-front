/**
 * @file src\components\list\Employees.tsx
 * @description Employees list component
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 23/02/2025
 * @license MIT
 * @version 0.0.1
 */

import { useEmployeeState, useShiftState } from "@/store/zustand";
import { calcPerHour } from "@/utils/number";
import EmployeeItem from "./Item";

const EmployeesList = () => {
  const { data: shift } = useShiftState();
  const { items: employees } = useEmployeeState();

  if (employees.length === 0) {
    return (
      <div className="mb-6 text-sm text-gray-300 text-center">
        {employees.length === 0 && <span>רשימה ריקה</span>}
      </div>
    );
  }

  return (
    <ul className="w-full mb-6 divide-y divide-gray-200 dark:divide-gray-700">
      {employees.map((employee, index) => (
        <li key={index} className="py-2">
          <EmployeeItem
            employee={{
              ...employee,
              perHour: calcPerHour(employee.hours, shift.tips),
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default EmployeesList;
