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
        "p-2 box-border w-full bg-white dark:bg-gray-800 border dark:border-gray-700 outline-none rounded-lg my-2"
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
          aria-label="add-employee"
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
  const [copySuccess, setCopySuccess] = useState(false);

  const handleDetailsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Object.keys(shift).includes(e.currentTarget.name)) {
      update({
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  };

  const handleSend = () => {
    setLoading(true);
    const url = encodeWhatsAppMessage({ shift, employees }).url;
    router.push(url);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  /**
   * Handles copying the report text to clipboard with mobile-friendly fallbacks
   */
  const handleCopy = async () => {
    const reportData = encodeWhatsAppMessage({ shift, employees });

    // Check if modern clipboard API is available
    if (!navigator.clipboard) {
      copyToClipboardFallback(reportData.message);
      return;
    }

    try {
      // Try modern clipboard API first
      await navigator.clipboard.writeText(reportData.message);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Clipboard API failed:", err);
      // Fallback to older method for mobile compatibility
      copyToClipboardFallback(reportData.message);
    }
  };

  /**
   * Fallback copy method using execCommand - works better on mobile devices
   */
  const copyToClipboardFallback = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Position textarea off-screen but keep it accessible
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } else {
        throw new Error("execCommand failed");
      }
    } catch (execErr) {
      console.error("execCommand failed:", execErr);
      // Final fallback - show text for manual copy
      alert("אנא העתק את הטקסט הבא:\n\n" + text);
    } finally {
      document.body.removeChild(textArea);
    }
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

        <h1 className="text-xl font-bold tracking-tight">דוח טיפים</h1>

        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <Button
            onClick={handleCopy}
            disabled={employees.length === 0}
            className={twMerge(
              "text-white transition-all duration-300 disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-800 font-semibold py-2 px-3 text-sm rounded-xl shadow-sm hover:shadow-md flex items-center gap-1",
              copySuccess
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600",
            )}
          >
            {copySuccess ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                <span className="hidden sm:inline">הועתק!</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                  />
                </svg>
                <span className="hidden sm:inline">העתק</span>
              </>
            )}
          </Button>

          {/* WhatsApp Send Button */}
          <Button
            onClick={handleSend}
            disabled={employees.length === 0 || loading}
            className={twMerge(
              "bg-green-500 hover:bg-green-600 text-white transition-all duration-300 disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-800 font-semibold py-2 px-3 text-sm rounded-xl shadow-sm hover:shadow-md flex items-center gap-1",
              loading &&
                "bg-transparent disabled:bg-transparent dark:bg-transparent disabled:dark:bg-transparent",
            )}
          >
            {loading ? (
              <Spinner color="success" size="md" />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.520.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span className="hidden sm:inline">שלח</span>
              </>
            )}
          </Button>
        </div>
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
              { label: "תאריך משמרת", value: localeDate },
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
