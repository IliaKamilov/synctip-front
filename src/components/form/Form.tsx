/**
 * @file src\components\form\Form.tsx
 * @description Dynamic form component
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

import { HTMLProps, ReactNode } from "react";

type FormProps = HTMLProps<HTMLFormElement> & {
  children: ReactNode;
};

const Form = (props: FormProps) => {
  return (
    <form {...props}>
      <div className="w-full grid gap-6 mb-6">{props.children}</div>
    </form>
  );
};

export default Form;
