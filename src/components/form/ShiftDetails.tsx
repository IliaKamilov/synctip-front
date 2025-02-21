/**
 * @file src\components\form\ShiftDetails.tsx
 * @description Shift Details form component
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

import { useShiftState } from "@/store/zustand";
import TextField from "../input/TextField";
import Form from "./Form";
import { ChangeEvent, FocusEvent } from "react";

const ShiftDetailsForm = () => {
  const { data: details, update } = useShiftState();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (Object.keys(details).indexOf(name) > -1) {
      update({
        [name]: value,
      });
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (Number(e.currentTarget.value) === 0) {
      e.currentTarget.value = "";
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "") {
      e.currentTarget.value = "0";
    }
  };

  return (
    <Form>
      <TextField
        id="name"
        name="name"
        type="date"
        required
        placeholder="בחר תאריך"
        label="תאריך"
      />
      <TextField
        onFocus={handleFocus}
        onBlur={handleBlur}
        id="tips"
        name="tips"
        type="number"
        required
        placeholder="סכום טיפים"
        label="טיפים"
        value={details.tips}
        onChange={handleChange}
      />
      <TextField
        onFocus={handleFocus}
        onBlur={handleBlur}
        id="total"
        name="total"
        type="number"
        placeholder="סכום קופה"
        label="קופה"
        value={details.total}
        onChange={handleChange}
      />
    </Form>
  );
};

export default ShiftDetailsForm;
