/**
 * @file src\components\layout\Footer.tsx
 * @description Main footer component
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 19/02/2025
 * @license MIT
 * @version 1.0.0
 */

import { version } from "../../../package.json";

const Footer = () => {
  return (
    <footer
      dir="ltr"
      className="flex justify-center items-center p-4 text-gray-300 dark:text-gray-600"
    >
      synctip {version} &copy; 2025
    </footer>
  );
};

export default Footer;
