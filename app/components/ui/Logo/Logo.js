"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import style from "./style.module.css";

export default function Logo({ ref, label }) {

  return (
    <Link href="/" className={style.logo} ref={ref}>
      {label}
    </Link>
  );
}
