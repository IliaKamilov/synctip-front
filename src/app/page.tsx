/**
 * @file src\app\page.tsx
 * @description Main page of the application
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 21/02/2025
 * @license MIT
 * @version 1.0.0
 */

"use client";

import Accordion from "@/components/accordion/Accordion";
import AddEmployeeForm from "@/components/form/AddEmployee";
import ShiftDetailsForm from "@/components/form/ShiftDetails";
import EmployeesList from "@/components/list/Employees";
import TimePreference from "@/components/preference/Time";
import ShiftSummary from "@/components/summary/Shift";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>loading</div>;

  return (
    <div className="container sm:p-2 p-4 w-full mx-auto">
      <Accordion title="פרטי משמרת">
        <ShiftDetailsForm />
      </Accordion>
      <Accordion title="אנשי צוות">
        <TimePreference />
        <EmployeesList />
        <AddEmployeeForm />
      </Accordion>
      <Accordion title="סיכום">
        <ShiftSummary />
      </Accordion>
    </div>
  );
};

export default Home;
