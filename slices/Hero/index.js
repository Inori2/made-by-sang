/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @type {import("react").FC<HeroProps>}
 */

import { PrismicRichText } from "@prismicio/react";

const Hero = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="top-content">
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
      </div>
    </section>
  );
};

export default Hero;
