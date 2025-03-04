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
import {
  extractTime,
  parseDecimalToTime,
  parseTimeToDecimal,
} from "@/utils/time";
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

interface TimeProps extends ComponentProps<"time"> {
  display?: "number" | "time";
  value: number;
}

const Time: FC<TimeProps> = ({ value = 0, display = "number", ...props }) => {
  const RenderTime = () => {
    switch (display) {
      case "time":
        return parseDecimalToTime(value);
      default:
        return value.toFixed(2);
    }
  };

  return (
    <time {...props}>
      <RenderTime />
    </time>
  );
};

const NewReportPage = () => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const [loading, setLoading] = useState(isMounted);
  const { items: employees } = useEmployeeState();
  const { data: shift, update } = useShiftState();
  const [selected, setSelected] = useState<Employee | null>(null);
  const [timeDisplay, setTimeDisplay] =
    useState<TimeProps["display"]>("number");

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
      <Navbar className="min-h-[60px] sticky top-0 bg-white dark:bg-gray-900 z-10 shadow-md border-b dark:border-gray-800">
        <Button
          onClick={() => router.back()}
          className="py-1 fixed right-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200"
        >
          <Chevron direction="right" className="p-2" width={40} height={40} />
        </Button>
        <h1 className="w-full text-center text-xl font-bold tracking-tight">
          דוח טיפים
        </h1>
        <Button
          onClick={handleSend}
          disabled={employees.length === 0 || loading}
          className={twMerge(
            "bg-green-500 hover:bg-green-600 text-white transition-all duration-300 disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-800 font-semibold py-2 px-4 text-md rounded-xl ml-3 fixed left-2 shadow-sm hover:shadow-md",
            loading &&
              "bg-transparent disabled:bg-transparent dark:bg-transparent disabled:dark:bg-transparent",
          )}
        >
          {loading ? <Spinner color="success" size="md" /> : "שלח"}
        </Button>
      </Navbar>
      <main className="box-border min-w-full flex flex-grow-1 flex-col w-full h-full max-w-6xl mx-auto py-4 gap-4 overflow-auto px-3">
        <div className="flex flex-col md:flex-row gap-4">
          <section className="p-4 gap-4 flex flex-col rounded-2xl bg-white dark:bg-gray-900 shadow-lg md:w-1/3">
            <div>
              <h2 className="text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                תאריך
              </h2>
              <Input
                name="date"
                type="date"
                placeholder="בחר תאריך"
                value={formatDate(shift.date)}
                onChange={handleDetailsChange}
              />
            </div>
            <div>
              <h2 className="text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                קופה
              </h2>
              <Input
                name="total"
                type="number"
                placeholder="0"
                value={shift.total || ""}
                onChange={handleDetailsChange}
              />
            </div>
            <div>
              <h2 className="text-sm font-bold mb-2 text-gray-700 dark:text-gray-300">
                טיפים
              </h2>
              <Input
                name="tips"
                type="number"
                placeholder="0"
                value={shift.tips || ""}
                onChange={handleDetailsChange}
              />
            </div>
          </section>

          <section className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg md:w-2/3">
            <div className="flex flex-row items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                {employees.length > 0 && `${employees.length} `}אנשי צוות
              </h2>
              <div className="flex flex-row gap-2 text-sm items-center">
                הצג:
                <div className="flex flex-row items-center gap-1 text-sm bg-gray-50 dark:bg-gray-800 rounded-lg p-1">
                  <button
                    className={twMerge(
                      "px-3 py-1.5 rounded-md transition-all duration-200",
                      timeDisplay === "number"
                        ? "bg-white dark:bg-gray-700 shadow-md font-bold"
                        : "text-gray-500 hover:text-gray-900",
                    )}
                    onClick={() => setTimeDisplay("number")}
                  >
                    מספר
                  </button>
                  <button
                    className={twMerge(
                      "px-3 py-1.5 rounded-md transition-all duration-200",
                      timeDisplay === "time"
                        ? "bg-white dark:bg-gray-700 shadow-md font-bold"
                        : "text-gray-500 hover:text-gray-900",
                    )}
                    onClick={() => setTimeDisplay("time")}
                  >
                    שעות
                  </button>
                </div>
              </div>
            </div>
            <AddEmployee />
            <ul className="flex flex-col gap-3 mt-4">
              {employees.map((employee) => {
                const earnings = calcWage(perhour, employee.hours);
                return (
                  <li key={employee.id}>
                    <Button
                      className="flex flex-row items-center w-full gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
                      onClick={() => setSelected(employee)}
                    >
                      <Avatar
                        alt={employee.name}
                        src={employee.image}
                        className="size-12 shadow-sm"
                      />
                      <div className="w-full flex flex-col items-start">
                        <div className="text-base font-medium">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          <Time value={employee.hours} display={timeDisplay} />
                        </div>
                      </div>
                      {earnings > 0 && (
                        <div className="bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-sm font-semibold px-2 py-1.5 rounded-lg shadow-sm">
                          {toILS(earnings)}
                        </div>
                      )}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <section className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-lg backdrop-blur-sm">
          <h2 className="text-xs font-bold mb-3 text-gray-800 dark:text-gray-200 tracking-wide">
            סיכום
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { label: "תאריך", value: localeDate },
              {
                label: "שעות צוות",
                value: <Time value={hours} display={timeDisplay} />,
              },
              { label: "טיפ לשעה", value: toILS(perhour) },
              {
                label: "אחוז שירות",
                value: `${calcAvgTips(shift.tips, shift.total).toFixed(1)} %`,
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="p-3 bg-gray-50/80 dark:bg-gray-800/80 rounded-xl hover:shadow-lg transition-all duration-300 group hover:scale-[1.02]"
              >
                <h3 className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
                  {label}
                </h3>
                <span className="text-base font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {value}
                </span>
              </div>
            ))}
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
