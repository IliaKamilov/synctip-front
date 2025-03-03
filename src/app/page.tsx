/**
 * @file src\app\page.tsx
 * @description Main page of the application
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

"use client";

// import Accordion from "@/components/accordion/Accordion";
// import AddEmployeeForm from "@/components/form/AddEmployee";
// import ShiftDetailsForm from "@/components/form/ShiftDetails";
// import EmployeesList from "@/components/list/employees/Employees";
// import TimePreference from "@/components/preference/Time";
// import ShiftSummary from "@/components/summary/Shift";
import React, { useEffect, useState } from "react";
import HomePage from "./home/page";

const RootPage = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>loading</div>;

  return (
    <>
      <HomePage />
    </>
  );
};

export default RootPage;
