/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @type {import("react").FC<HeroProps>}
 */
"use client";
import GridPattern from "@/app/components/global/GridPattern/GridPattern";
import { PrismicRichText } from "@prismicio/react";
import { useRef } from "react";
import style from "./style.module.css"
const Hero = ({ slice }) => {
  const btnRef = useRef(null);
  return (
    <>
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={style.hero}
    >
      <div className={style.top}>
        <h1>{slice.primary.heading_1}</h1>
        <PrismicRichText field={slice.primary.paragraph_1} />
      </div>
      <div className={style.center}>
        <video
        src={slice.primary.video.url}
        autoPlay
        muted
        loop
        ></video>
      </div>
      <div className={style.bottom}>
        <PrismicRichText field={slice.primary.paragraph_2} />
        <h1>{slice.primary.heading_2}</h1>
      </div>
    </section>
    <GridPattern />
    </>
  );
};

export default Hero;
