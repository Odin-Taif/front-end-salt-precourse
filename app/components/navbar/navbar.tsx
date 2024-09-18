import Link from "next/link";
import React from "react";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Sign In",
    href: "/sign-in",
  },
  {
    name: "Sign Up",
    href: "/sign-up",
  },
];

const Navbar = () => {
  return (
    <>
      <div className="flex p-2 bg-gray-200">
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex h-[48px] grow items-center justify-center mx-2 gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
