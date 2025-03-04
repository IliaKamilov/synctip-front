/**
 * @file src\components\preference\Time.tsx
 * @description Time Preferences component implementation
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

import { usePreferenceState } from "@/store/zustand";

const TimePreference = () => {
  const { data: preference, update } = usePreferenceState();
  const { time } = preference;

  return (
    <div className="w-full flex items-center gap-2 justify-end">
      <span className="text-sm text-gray-400">תצוגת זמן: </span>
      <div className="inline-flex rounded-md shadow-xs" role="group">
        <button
          onClick={() => update({ time: "hourly" })}
          type="button"
          disabled={time === "hourly"}
          className={`text-gray-700 disabled:text-gray-300 px-4 py-2 font-medium text-sm border rounded-s-lg disabled:cursor-not-allowed`}
        >
          שעתי
        </button>
        <button
          onClick={() => update({ time: "decimal" })}
          type="button"
          disabled={time === "decimal"}
          className={`text-gray-700 disabled:text-gray-300 px-4 py-2 font-medium text-sm border rounded-e-lg disabled:cursor-not-allowed`}
        >
          עשרוני
        </button>
      </div>
    </div>
  );
};

export default TimePreference;
