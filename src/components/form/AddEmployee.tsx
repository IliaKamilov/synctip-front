/**
 * @file src\components\form\AddEmloyee.tsx
 * @description Add Employee Form
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import TextField from "../input/TextField";
import { useEmployeeState } from "@/store/zustand";
import { extractTime, parseTimeToDecimal } from "@/utils/time";

const AddEmployeeForm = () => {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { add, items: employees } = useEmployeeState();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) return setError("חובה להזין שם עובד וכמות שעות");

    const [name, hours] = extractTime(input);

    if (!name || !hours) return setError("שגיאה בהזנת נתונים");

    const isExists = employees.find((e) => e.name === name);

    if (isExists) return setError(`${name} כבר נמצא ברשימה`);

    add({ name, hours: parseTimeToDecimal(hours) });
    setInput("");
  };

  return (
    <Fragment>
      <form className="flex flex-row w-full gap-4" onSubmit={handleSubmit}>
        <TextField
          id="add-employee"
          name="add-employee"
          type="text"
          placeholder="שם וכמות שעות"
          value={input}
          onChange={handleChange}
          error={error}
        />
        <button
          type="button"
          disabled={!input}
          className="px-6 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          הוסף
        </button>
      </form>
      {error && <div className="my-2 text-sm text-rose-500">{error}</div>}
    </Fragment>
  );
};

export default AddEmployeeForm;
