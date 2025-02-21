/**
 * @file src\components\layout\Navbar.tsx
 * @description The main navigation component for the application
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 19/02/2025
 * @license MIT
 * @version 1.0.0
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAVIGATION = {
  HOME: "/",
  TERMS: "/terms",
  PRIVACY: "/privacy",
};

const TRANSLATIONS: Record<keyof typeof NAVIGATION, string> = {
  HOME: "בית",
  TERMS: "תנאים",
  PRIVACY: "פרטיות",
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleToggle = () => setOpen(!open);

  const handleLinkClick = () => setOpen(false);

  const activeClassName =
    "block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500";
  const defaultClassName =
    "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

  const className = (path: string) => {
    const isActive = path === pathname;

    return isActive ? activeClassName : defaultClassName;
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <button
          ref={triggerRef}
          onClick={handleToggle}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={open}
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            </svg>
          )}
        </button>
        <div
          ref={menuRef}
          className={`${
            open ? "block" : "hidden"
          } w-full md:block md:w-auto" id="navbar-default`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {Object.entries(NAVIGATION).map(([key, value]) => (
              <li key={key}>
                <Link
                  onClick={handleLinkClick}
                  href={value}
                  className={className(value)}
                >
                  {TRANSLATIONS[key as keyof typeof TRANSLATIONS]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
