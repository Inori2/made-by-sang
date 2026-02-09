import styles from "./Pattern.module.css";
import gsap from "gsap";
import { useRef, useEffect } from "react";


export default function Pattern() {
  const patternRef = useRef(null);

  useEffect(() => {
  const ctx = gsap.context(() => {
    const paths = Array.from(patternRef.current.querySelectorAll("path"));

    const rows = 4;
    const cols = 7;

    gsap.set(paths, { autoAlpha: 0 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    // timing
    const itemDuration = 1;   // each plus fade in/out speed
    const itemGap = 0.1;        // delay between items in same column
    const colOverlap = 0.5;      // 👈 70%

    // How long one column takes (top -> bottom)
    const colDuration = (rows - 1) * itemGap + itemDuration;

    // When next column starts
    const colOffset = colDuration * colOverlap;

    for (let c = 0; c < cols; c++) {
      // get this column’s paths (they are stored bottom->top)
      const col = [];
      for (let r = 0; r < rows; r++) {
        col.push(paths[c * rows + r]);
      }

      // fix order: top -> bottom
      col.reverse();

      // start time for this column
      const startTime = c * colOffset;

      // animate IN (top -> bottom)
      tl.to(
        col,
        { delay: 0.3,
          autoAlpha: 1,
          duration: itemDuration,
          ease: "power2.out",
          stagger: itemGap,
        },
        startTime
      );

      // animate OUT (top -> bottom), slightly after IN
      tl.to(
        col,
        {
          autoAlpha: 0,
          duration: itemDuration,
          ease: "power2.out",
          stagger: itemGap,
        },
        startTime + 1 // adjust this delay for how long it stays visible
      );
    }
  }, patternRef);

  return () => ctx.revert();
}, []);




    return (
          <div className={styles.pattern}>
            <svg width="108" height="60" viewBox="0 0 108 60" fill="none" xmlns="http://www.w3.org/2000/svg" ref={patternRef}>
              <path d="M6.59961 54.5996H12V53.4004H6.59961V48H5.40039V53.4004H0V54.5996H5.40039V60H6.59961V54.5996Z" fill="#FAFAFA"/>
              <path d="M6.59961 38.5996H12V37.4004H6.59961V32H5.40039V37.4004H0V38.5996H5.40039V44H6.59961V38.5996Z" fill="#FAFAFA"/>
              <path d="M6.59961 22.5996H12V21.4004H6.59961V16H5.40039V21.4004H0V22.5996H5.40039V28H6.59961V22.5996Z" fill="#FAFAFA"/>
              <path d="M6.59961 6.59961H12V5.40039H6.59961V0H5.40039V5.40039H0V6.59961H5.40039V12H6.59961V6.59961Z" fill="#FAFAFA"/>
              <path d="M22.5996 54.5996H28V53.4004H22.5996V48H21.4004V53.4004H16V54.5996H21.4004V60H22.5996V54.5996Z" fill="#FAFAFA"/>
              <path d="M22.5996 38.5996H28V37.4004H22.5996V32H21.4004V37.4004H16V38.5996H21.4004V44H22.5996V38.5996Z" fill="#FAFAFA"/>
              <path d="M22.5996 22.5996H28V21.4004H22.5996V16H21.4004V21.4004H16V22.5996H21.4004V28H22.5996V22.5996Z" fill="#FAFAFA"/>
              <path d="M22.5996 6.59961H28V5.40039H22.5996V0H21.4004V5.40039H16V6.59961H21.4004V12H22.5996V6.59961Z" fill="#FAFAFA"/>
              <path d="M38.5996 54.5996H44V53.4004H38.5996V48H37.4004V53.4004H32V54.5996H37.4004V60H38.5996V54.5996Z" fill="#FAFAFA"/>
              <path d="M38.5996 38.5996H44V37.4004H38.5996V32H37.4004V37.4004H32V38.5996H37.4004V44H38.5996V38.5996Z" fill="#FAFAFA"/>
              <path d="M38.5996 22.5996H44V21.4004H38.5996V16H37.4004V21.4004H32V22.5996H37.4004V28H38.5996V22.5996Z" fill="#FAFAFA"/>
              <path d="M38.5996 6.59961H44V5.40039H38.5996V0H37.4004V5.40039H32V6.59961H37.4004V12H38.5996V6.59961Z" fill="#FAFAFA"/>
              <path d="M54.5996 54.5996H60V53.4004H54.5996V48H53.4004V53.4004H48V54.5996H53.4004V60H54.5996V54.5996Z" fill="#FAFAFA"/>
              <path d="M54.5996 38.5996H60V37.4004H54.5996V32H53.4004V37.4004H48V38.5996H53.4004V44H54.5996V38.5996Z" fill="#FAFAFA"/>
              <path d="M54.5996 22.5996H60V21.4004H54.5996V16H53.4004V21.4004H48V22.5996H53.4004V28H54.5996V22.5996Z" fill="#FAFAFA"/>
              <path d="M54.5996 6.59961H60V5.40039H54.5996V0H53.4004V5.40039H48V6.59961H53.4004V12H54.5996V6.59961Z" fill="#FAFAFA"/>
              <path d="M70.5996 54.5996H76V53.4004H70.5996V48H69.4004V53.4004H64V54.5996H69.4004V60H70.5996V54.5996Z" fill="#FAFAFA"/>
              <path d="M70.5996 38.5996H76V37.4004H70.5996V32H69.4004V37.4004H64V38.5996H69.4004V44H70.5996V38.5996Z" fill="#FAFAFA"/>
              <path d="M70.5996 22.5996H76V21.4004H70.5996V16H69.4004V21.4004H64V22.5996H69.4004V28H70.5996V22.5996Z" fill="#FAFAFA"/>
              <path d="M70.5996 6.59961H76V5.40039H70.5996V0H69.4004V5.40039H64V6.59961H69.4004V12H70.5996V6.59961Z" fill="#FAFAFA"/>
              <path d="M86.5996 54.5996H92V53.4004H86.5996V48H85.4004V53.4004H80V54.5996H85.4004V60H86.5996V54.5996Z" fill="#FAFAFA"/>
              <path d="M86.5996 38.5996H92V37.4004H86.5996V32H85.4004V37.4004H80V38.5996H85.4004V44H86.5996V38.5996Z" fill="#FAFAFA"/>
              <path d="M86.5996 22.5996H92V21.4004H86.5996V16H85.4004V21.4004H80V22.5996H85.4004V28H86.5996V22.5996Z" fill="#FAFAFA"/>
              <path d="M86.5996 6.59961H92V5.40039H86.5996V0H85.4004V5.40039H80V6.59961H85.4004V12H86.5996V6.59961Z" fill="#FAFAFA"/>
              <path d="M102.6 54.5996H108V53.4004H102.6V48H101.4V53.4004H96V54.5996H101.4V60H102.6V54.5996Z" fill="#FAFAFA"/>
              <path d="M102.6 38.5996H108V37.4004H102.6V32H101.4V37.4004H96V38.5996H101.4V44H102.6V38.5996Z" fill="#FAFAFA"/>
              <path d="M102.6 22.5996H108V21.4004H102.6V16H101.4V21.4004H96V22.5996H101.4V28H102.6V22.5996Z" fill="#FAFAFA"/>
              <path d="M102.6 6.59961H108V5.40039H102.6V0H101.4V5.40039H96V6.59961H101.4V12H102.6V6.59961Z" fill="#FAFAFA"/>
            </svg>
          </div>
    )
}