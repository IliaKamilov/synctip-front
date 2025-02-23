/**
 * @file src\types\employee\index.ts
 * @description Employee Types source file
 * @author Ilia Kamilov <iliakmlv@gmail.com> (https://github.com/iliakamilov)
 * @date 23/02/2025
 * @license MIT
 * @version 0.0.1
 */

export interface Employee {
  id: string;
  name: string;
  hours: number;
  image?: string;
}
