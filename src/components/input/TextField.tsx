/**
 * @file src\components\input\TextField.tsx
 * @description Dynamic TextField component
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

import { HTMLProps } from "react";

type TextFieldProps = HTMLProps<HTMLInputElement> & {
  error?: string | null;
};

const TextField = (props: TextFieldProps) => {
  return (
    <div className="w-full">
      {props.label && (
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor={props.id || "input"}
        >
          {props.label}
        </label>
      )}
      <input
        className={`w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        {...props}
      />
    </div>
  );
};

export default TextField;
