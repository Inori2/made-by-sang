/**
 * @typedef {import("@prismicio/client").Content.TextHighlightSlice} TextHighlightSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TextHighlightSlice>} TextHighlightProps
 * @type {import("react").FC<TextHighlightProps>}
 */

'use client';
import { PrismicRichText } from '@prismicio/react';
import styles from './style.module.css';
import GridPattern from '@/app/components/global/GridPattern/GridPattern';

const TextHighlight = ({ slice }) => {
  return (
    <>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={styles.about}
      >
        <span className="text-highlight">{slice.primary.heading}</span>
        <PrismicRichText field={slice.primary.description} />
        <GridPattern />
      </section>
    </>
  );
};

export default TextHighlight;
