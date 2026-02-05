"use client";

import { useState } from "react";
import { SliceZone } from "@prismicio/react";

import { components } from "@/slices";
import Preloader from "./Preloader";

export default function HomeClients({ slices }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* your slices only show when loading is done */}
      {!isLoading && <SliceZone slices={slices} components={components} />}
    </>
  );
}
