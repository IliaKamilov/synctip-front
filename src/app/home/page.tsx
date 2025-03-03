import { Drawer } from "@/components/Drawer";
import Link from "next/link";
import { Fragment } from "react";

const HomeNavbar = () => {
  return (
    <Fragment>
      <nav className="rtl:flex-row-reverse flex">
        <Drawer label="תפריט ראשי">
          <ul>
            <li className="flex w-full min-w-[200px]">
              <Link href="/new/report" className="flex w-full items-center">
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
        </Drawer>
      </nav>
    </Fragment>
  );
};

const HomePage = () => {
  return (
    <>
      <HomeNavbar />
    </>
  );
};

export default HomePage;
