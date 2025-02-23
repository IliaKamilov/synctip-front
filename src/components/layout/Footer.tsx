/**
 * @file src\components\layout\Footer.tsx
 * @description Main footer component
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 19/02/2025
 * @license MIT
 * @version 1.0.0
 */

import pkg from "../../../package.json";

const Footer = () => {
  return (
    <footer
      dir="ltr"
      className="select-none flex text-xs justify-center items-center text-gray-300 dark:text-gray-600"
    >
      synctip {pkg.version} &copy; 2025
    </footer>
  );
};

export default Footer;
