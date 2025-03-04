"use client";
import { Avatar } from "@/components/Avatar/Avatar";
import { Button } from "@/components/Button";
import { Chevron } from "@/components/Icon/Chevron";
import { Modal, ModalProps } from "@/components/Modal/Modal";
import { Navbar } from "@/components/Navbar";
import { encodeWhatsAppMessage } from "@/components/share/Whatsapp";
import { Spinner } from "@/components/Spinner/Spinner";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useEmployeeState, useShiftState } from "@/store/zustand";
import { Employee } from "@/types/employee";
import { formatDate } from "@/utils/format-date/formatDate";
import {
  calcAvgTips,
  calcHours,
  calcPerHour,
  calcWage,
  toILS,
} from "@/utils/number";
import { extractTime, parseTimeToDecimal } from "@/utils/time";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  ComponentProps,
  FC,
  FormEvent,
  Fragment,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentProps<"input">;

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={twMerge(
        className,
        "p-2 box-border w-full bg-white dark:bg-gray-800 border dark:border-gray-700 outline-none rounded-lg my-2",
      )}
      {...props}
    />
  );
};

interface EmployeeMenuModalProps extends ModalProps {
  employee: Employee;
}

const EmployeeMenuModal: FC<EmployeeMenuModalProps> = ({
  employee,
  onClose = () => {},
}) => {
  const { remove } = useEmployeeState();

  const handleRemove = () => {
    remove(employee.id);
    onClose();
  };

  return (
    <Modal open={Boolean(employee.name)} onClose={onClose}>
      <ul>
        <li>
          <Button
            onClick={handleRemove}
            className="text-sm w-full text-left rtl:text-right p-4"
          >
            הסר את {employee.name}
          </Button>
        </li>
      </ul>
    </Modal>
  );
};

type AddEmployeeProps = ComponentProps<"div">;

const AddEmployee: FC<AddEmployeeProps> = ({}) => {
  const [value, setValue] = useState<string>("");
  const { add, items } = useEmployeeState();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setValue(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return setError("חובה להזין שם עובד וכמות שעות");

    const [name, hours] = extractTime(value);

    if (!hours) return setError("יש להזין שעות בפורמט שעתי או עשרוני");

    if (!name || !hours) return setError("שגיאה בהזנת נתונים");

    const isExists = items.find((e) => e.name === name);

    if (isExists) return setError(`${name} כבר נמצא ברשימה`);

    add({ name, hours: parseTimeToDecimal(hours) });
    setValue("");
  };

  const disabled = Boolean(!value);

  return (
    <div className="w-full flex flex-col items-start">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-row items-center gap-2"
      >
        <Input
          type="search"
          placeholder="הוסף איש צוות"
          value={value}
          onChange={handleChange}
        />
        <Button
          disabled={disabled}
          className="p-2 box-border disabled:opacity-20 bg-white dark:bg-gray-800 border rounded-lg items-center flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
        </Button>
      </form>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
    </div>
  );
};

const NewReportPage = () => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const [loading, setLoading] = useState(isMounted);
  const { items: employees } = useEmployeeState();
  const { data: shift, update } = useShiftState();
  const [selected, setSelected] = useState<Employee | null>(null);

  const handleDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Object.keys(shift).includes(e.currentTarget.name)) {
      update({
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  };

  const handleSend = () => {
    setLoading(true);
    router.push(encodeWhatsAppMessage({ shift, employees }).url);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const hours = calcHours(employees.map((e) => e.hours));
  const perhour = calcPerHour(hours, shift.tips);

  if (!isMounted) return <>loading</>;

  const localeDate = new Date(shift.date).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  return (
    <Fragment>
      <Navbar className="min-h-[80px]">
        <Button onClick={() => router.back()} className="py-2 fixed right-0">
          <Chevron direction="right" className="p-4" width={56} height={56} />
        </Button>
        <h1 className="w-full text-center text-lg font-semibold">דוח טיפים</h1>
        <Button
          onClick={handleSend}
          disabled={employees.length === 0 || loading}
          className={twMerge(
            "bg-green-500 text-gray-900 dark:text-gray-900 disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-800 font-semibold p-2 px-4 text-md rounded-lg ml-4 fixed left-0",
            loading &&
              "bg-transparent disabled:bg-transparent dark:bg-transparent disabled:dark:bg-transparent",
          )}
        >
          {loading ? <Spinner color="success" size="md" /> : "שלח"}
        </Button>
      </Navbar>
      <main className="box-border flex flex-grow-1 flex-col w-full h-full py-4 gap-4 overflow-auto">
        <section className="p-4 gap-4 flex flex-col dark:bg-gray-900">
          <div>
            <h2 className="text-sm font-semibold">תאריך</h2>
            <Input
              name="date"
              type="date"
              placeholder="בחר תאריך"
              value={formatDate(shift.date)}
              onChange={handleDetailsChange}
            />
          </div>
          <div>
            <h2 className="text-sm font-semibold">קופה</h2>
            <Input
              name="total"
              type="number"
              placeholder="0"
              value={shift.total || ""}
              onChange={handleDetailsChange}
            />
          </div>
          <div>
            <h2 className="text-sm font-semibold">טיפים</h2>
            <Input
              name="tips"
              type="number"
              placeholder="0"
              value={shift.tips || ""}
              onChange={handleDetailsChange}
            />
          </div>
        </section>
        <section className="p-4 dark:bg-gray-900 gap-2">
          <h2 className="text-sm font-semibold">
            {employees.length > 0 && `${employees.length} `}אנשי צוות
          </h2>
          <div className="flex flex-row gap-2 items-center">
            <AddEmployee />
          </div>
          <ul className="flex flex-col gap-4 mt-4">
            {employees.map((employee) => {
              const earnings = calcWage(perhour, employee.hours);
              return (
                <li key={employee.id} className="flex items-center">
                  <Button
                    className="flex flex-row items-start w-full gap-4"
                    onClick={() => setSelected(employee)}
                  >
                    <Avatar alt={employee.name} src={employee.image} />
                    <div className="w-full flex flex-col items-start justify-start">
                      <div className="text-md h-full items-center flex justify-center">
                        {employee.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {employee.hours.toFixed(2)} {`ש'`}
                      </div>
                    </div>
                    {earnings > 0 && (
                      <div className="bg-green-100 dark:bg-green-900 text-xs border-green-300 border px-1 py-0.5 rounded-md">
                        {toILS(earnings)}
                      </div>
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="p-4 dark:bg-gray-900 flex flex-col gap-2">
          <h2 className="text-sm font-semibold ">סיכום</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">
                תאריך
              </h3>
              <time className="text-md font-medium">{localeDate}</time>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">
                שעות צוות
              </h3>
              <span className="text-md font-medium">{hours.toFixed(2)}</span>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">
                טיפ לשעה
              </h3>
              <span className="text-md font-medium">{toILS(perhour)}</span>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">
                אחוז שירות
              </h3>
              <span className="text-md font-medium">
                {calcAvgTips(shift.tips, shift.total).toFixed(1)} %
              </span>
            </div>
          </div>
        </section>
      </main>
      {selected && (
        <EmployeeMenuModal
          employee={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </Fragment>
  );
};

export default NewReportPage;
