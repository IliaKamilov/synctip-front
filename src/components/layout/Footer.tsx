/**
 * @file src\components\layout\Footer.tsx
 * @description Main footer component
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 19/02/2025
 * @license MIT
 * @version 1.0.0
 */

import Link from "next/link";
import pkg from "../../../package.json";

const Footer = () => {
  return (
    <footer
      dir="ltr"
      className="select-none flex justify-center items-center py-6 text-xs font-light text-gray-400 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-500 transition-colors duration-300"
    >
      <p className="flex items-center space-x-2">
        <Link href="/" className="hover:text-gray-600 transition-colors">
          synctip
        </Link>
        <Link
          href={`https://github.com/IliaKamilov/synctip/releases/tag/v${pkg.version}`}
          className="hover:text-gray-600 transition-colors"
        >
          v{pkg.version}
        </Link>
        <span className="mx-1.5 text-gray-500">&copy;</span>
        <span className="font-medium text-gray-500">2025</span>
      </p>
    </footer>
  );
};

export default Footer;
