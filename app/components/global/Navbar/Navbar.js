"use client";
import { useRef } from "react";
import Link from "next/link";
import Logo from "../../ui/Logo/Logo";
import Bttn from "../../ui/Bttn/Bttn";

export default function Navbar({ data }) {
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  return (
    <header className="w-screen p-5 flex justify-between">
      <Link className="uppercase" href="/">
        <Logo label={data.logo} ref={logoRef} />
      </Link>
      <Bttn
        className="relative px-4 py-2 border border-(--secondary-900) bg-(--primary-950) uppercase cursor-pointer"
        label="menu"
        ref={menuRef}
      />
    </header>
  );
}
