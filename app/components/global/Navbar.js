import Link from "next/link";
import { PrismicImage } from "@prismicio/react";

export default function Navbar({ data }) {
  return (
    <header>
      <Link href="/">
        <span>{data.logo}</span>
      </Link>
    </header>
  );
}
