/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @type {import("react").FC<HeroProps>}
 */
"use client";
import { PrismicRichText } from "@prismicio/react";
import Btn from "@/app/components/uis/Btn";
import { useRef } from "react";
const Hero = ({ slice }) => {
  const btnRef = useRef(null);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-screen h-dvh flex justify-center items-center"
    >
      {/* <div className="top-content">
        <h1 className="title">{slice.primary.heading_1}</h1>
        <div className="description">
          <span>[D]</span>
          <span>
            {">"}
            <PrismicRichText field={slice.primary.paragraph_1} />
          </span>
        </div>
      </div>
      <div className="bottom-content">
        <div className="about">
          <span>[A]</span>
          <span>
            {">"}
            <PrismicRichText field={slice.primary.paragraph_2} />
          </span>
        </div>
        <h1 className="title">{slice.primary.heading_2}</h1>
      </div> */}
    </section>
  );
};

export default Hero;
