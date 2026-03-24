/**
 * @typedef {import("@prismicio/client").Content.TextHighlightSlice} TextHighlightSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TextHighlightSlice>} TextHighlightProps
 * @type {import("react").FC<TextHighlightProps>}
 */

'use client';
import { PrismicRichText } from '@prismicio/react';
import styles from './style.module.css';
import GridPattern from '@/app/components/global/GridPattern/GridPattern';
import Btn from '@/app/components/ui/Btn/Btn';

const TextHighlight = ({ slice }) => {
  return (
    <>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={styles.about}
      >
        <div className={styles.contentContainer}>
          <span className="text-highlight">{slice.primary.heading}</span>
          <div className={styles.description}>
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>
        <div className={styles.svgContainer}>
          <svg
            width="620"
            height="620"
            viewBox="0 0 620 620"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M309.992 620V595.462" stroke="#262626" />
            <path d="M258.976 615.772L263.005 591.566" stroke="#262626" />
            <path d="M209.336 603.205L217.311 579.993" stroke="#262626" />
            <path d="M162.448 582.629L174.137 561.059" stroke="#262626" />
            <path d="M119.59 554.626L134.661 535.278" stroke="#262626" />
            <path d="M81.9204 519.958L99.9758 503.345" stroke="#262626" />
            <path d="M50.4854 479.553L71.0111 466.14" stroke="#262626" />
            <path d="M26.1133 434.522L48.5789 424.674" stroke="#262626" />
            <path d="M9.48364 386.093L33.259 380.074" stroke="#262626" />
            <path d="M1.06104 335.607L25.4996 333.568" stroke="#262626" />
            <path d="M1.06104 284.393L25.4996 286.416" stroke="#262626" />
            <path d="M9.48364 233.891L33.259 239.926" stroke="#262626" />
            <path d="M26.1133 185.478L48.5789 195.326" stroke="#262626" />
            <path d="M50.4854 140.447L71.0111 153.86" stroke="#262626" />
            <path d="M81.9204 100.042L99.9758 116.655" stroke="#262626" />
            <path d="M119.59 65.3574L134.661 84.7226" stroke="#262626" />
            <path d="M162.448 37.3708L174.137 58.9411" stroke="#262626" />
            <path d="M209.336 16.7952L217.311 39.9903" stroke="#262626" />
            <path d="M258.976 4.22803L263.005 28.4179" stroke="#262626" />
            <path d="M309.992 0V24.5215" stroke="#262626" />
            <path d="M361.024 4.22803L356.979 28.4179" stroke="#262626" />
            <path d="M410.647 16.7952L402.689 39.9903" stroke="#262626" />
            <path d="M457.535 37.3708L445.863 58.9411" stroke="#262626" />
            <path d="M500.41 65.374L485.339 84.7226" stroke="#262626" />
            <path d="M538.063 100.042L520.024 116.655" stroke="#262626" />
            <path d="M569.515 140.447L548.989 153.86" stroke="#262626" />
            <path d="M593.887 185.478L571.421 195.326" stroke="#262626" />
            <path d="M610.517 233.891L586.725 239.926" stroke="#262626" />
            <path d="M618.939 284.393L594.484 286.432" stroke="#262626" />
            <path d="M618.939 335.591L594.484 333.568" stroke="#262626" />
            <path d="M610.517 386.093L586.725 380.074" stroke="#262626" />
            <path d="M593.887 434.522L571.421 424.674" stroke="#262626" />
            <path d="M569.515 479.553L548.989 466.14" stroke="#262626" />
            <path d="M538.08 519.958L520.024 503.345" stroke="#262626" />
            <path d="M500.394 554.626L485.339 535.278" stroke="#262626" />
            <path d="M457.535 582.629L445.863 561.059" stroke="#262626" />
            <path d="M410.647 603.205L402.689 579.993" stroke="#262626" />
            <path d="M361.024 615.772L356.979 591.566" stroke="#262626" />
            <path
              d="M548.685 310C548.685 178.178 441.822 71.315 310 71.315C178.178 71.315 71.3152 178.178 71.3152 310C71.3152 441.822 178.178 548.685 310 548.685C441.822 548.685 548.685 441.822 548.685 310ZM569.515 310C569.515 453.326 453.326 569.515 310 569.515C166.674 569.515 50.4856 453.326 50.4856 310C50.4856 166.674 166.674 50.4854 310 50.4854C453.326 50.4854 569.515 166.674 569.515 310Z"
              fill="#0A0A0A"
              stroke="#262626"
              strokeWidth="0.5"
            />
            <circle
              cx="310"
              cy="310"
              r="248.902"
              stroke="#0F0F0F"
              strokeWidth="10"
            />
          </svg>
        </div>
        <GridPattern />
      </section>
    </>
  );
};

export default TextHighlight;
