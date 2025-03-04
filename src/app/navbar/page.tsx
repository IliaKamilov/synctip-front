"use client";
import { XMarkIcon } from "@/components/Icon/XMark";
import { Navbar } from "@/components/Navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import NextLink from "next/link";

const NavbarPage = () => {
  return (
    <>
      <Navbar>
        <Navbar.Brand as={NextLink} href="/">
          <XMarkIcon className="size-6" />
        </Navbar.Brand>
        <ThemeToggle />
      </Navbar>
    </>
  );
};

export default NavbarPage;
