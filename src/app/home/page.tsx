import { Drawer } from "@/components/Drawer";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { Fragment } from "react";
import pkg from "package.json";

const HomeNavbar = () => {
  return (
    <Fragment>
      <nav className="rtl:flex-row-reverse flex justify-between fixed w-full">
        <Drawer label="תפריט ראשי">
          <ul className="min-h-[50vh]">
            <ol className="px-4 font-bold text-sm">טיפים</ol>
            <li className="flex w-full min-w-[200px]">
              <Link href="/report/create" className="flex w-full items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width={56}
                  height={56}
                  className="p-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                דוח חדש
              </Link>
            </li>
          </ul>
          <div className="flex p-3 text-gray-500 dark:text-gray-400 rtl:flex-row-reverse items-center justify-center text-xs font-light flex-row w-full gap-3 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="https://synctip.com"
              className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              synctip.com
            </Link>
            <span className="text-sm">&copy;</span>
            <Link
              className="border px-2 py-1 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
              href="https://github.com/iliakamilov/synctip"
            >
              v{pkg.version}
            </Link>
            <span>{new Date().getFullYear()}</span>
          </div>
        </Drawer>
        <ThemeToggle />
      </nav>
    </Fragment>
  );
};

const HomePage = () => {
  return (
    <>
      <div className="min-h-[72px]">
        <HomeNavbar />
      </div>
      <div className="w-full h-full flex flex-col p-6">
        <div className="mx-auto my-20 gap-4 flex flex-col">
          <h1 className="text-4xl text-left">Synctip</h1>
          <h2 className="text-4xl dark:text-gray-300">
            בונים את העתיד של עולם השירות
          </h2>
        </div>
        <div className="flex flex-row items-center justify-center w-full">
          <Link
            href="/report/create"
            className="flex flex-row gap-4 items-center justify-center dark:bg-purple-950 bg-purple-500 text-white dark:text-purple-300 text-xl px-4 py-2 rounded-xl"
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            דוח טיפים
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
