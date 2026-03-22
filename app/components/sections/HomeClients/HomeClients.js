"use client";

import { useState } from "react";
import { SliceZone } from "@prismicio/react";

import { components } from "@/slices";
import Preloader from "../Preloader/Preloader";

export default function HomeClients({ slices }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <SliceZone slices={slices} components={components} />
    </>
  );
}
