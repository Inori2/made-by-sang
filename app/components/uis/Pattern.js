import styles from "./Pattern.module.css";
import gsap from "gsap";
import { useRef, useEffect } from "react";


export default function Pattern() {
  const patternRef = useRef(null);

  useEffect(() => {
  const ctx = gsap.context(() => {
    const pattern = patternRef.current.querySelectorAll("path");

    gsap.set(pattern, { opacity: 0 });

    gsap.fromTo(pattern, {
      delay: 1,
      opacity: 0,
      duration: 2,
      ease: "power2.out",
    }, {
      opacity: 1,
      duration: 2,
      ease: "power2.out",
      stagger: {
        each: 0.1,
        grid: [4, 7], // 4 rows, 7 columns
        from: "start", // wave from top-left
      },
      repeat: -1,
      yoyo: true,
    });
  }, patternRef);

  return () => ctx.revert();
}, []);


    return (
          <div className={styles.pattern}>
            <svg
              width="108"
              height="60"
              viewBox="0 0 108 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              ref={patternRef}
            >
              <path
                d="M6.59961 54.5996H12V53.4004H6.59961V48H5.40039V53.4004H0V54.5996H5.40039V60H6.59961V54.5996Z"
                fill="#FAFAFA"
              />
              <path
                d="M6.59961 38.5996H12V37.4004H6.59961V32H5.40039V37.4004H0V38.5996H5.40039V44H6.59961V38.5996Z"
                fill="#FAFAFA"
              />
              <path
                d="M6.59961 22.5996H12V21.4004H6.59961V16H5.40039V21.4004H0V22.5996H5.40039V28H6.59961V22.5996Z"
                fill="#FAFAFA"
              />
              <path
                d="M6.59961 6.59961H12V5.40039H6.59961V0H5.40039V5.40039H0V6.59961H5.40039V12H6.59961V6.59961Z"
                fill="#FAFAFA"
              />
              <path
                d="M22.5996 54.5996H28V53.4004H22.5996V48H21.4004V53.4004H16V54.5996H21.4004V60H22.5996V54.5996Z"
                fill="#FAFAFA"
              />
              <path
                d="M22.5996 38.5996H28V37.4004H22.5996V32H21.4004V37.4004H16V38.5996H21.4004V44H22.5996V38.5996Z"
                fill="#FAFAFA"
              />
              <path
                d="M22.5996 22.5996H28V21.4004H22.5996V16H21.4004V21.4004H16V22.5996H21.4004V28H22.5996V22.5996Z"
                fill="#FAFAFA"
              />
              <path
                d="M22.5996 6.59961H28V5.40039H22.5996V0H21.4004V5.40039H16V6.59961H21.4004V12H22.5996V6.59961Z"
                fill="#FAFAFA"
              />
              <path
                d="M38.5996 5.40039H44V6.59961H38.5996V12H37.4004V6.59961H32V5.40039H37.4004V0H38.5996V5.40039Z"
                fill="#FAFAFA"
              />
              <path
                d="M38.5996 21.4004H44V22.5996H38.5996V28H37.4004V22.5996H32V21.4004H37.4004V16H38.5996V21.4004Z"
                fill="#FAFAFA"
              />
              <path
                d="M38.5996 37.4004H44V38.5996H38.5996V44H37.4004V38.5996H32V37.4004H37.4004V32H38.5996V37.4004Z"
                fill="#FAFAFA"
              />
              <path
                d="M38.5996 53.4004H44V54.5996H38.5996V60H37.4004V54.5996H32V53.4004H37.4004V48H38.5996V53.4004Z"
                fill="#FAFAFA"
              />
              <path
                d="M54.5996 54.5996H60V53.4004H54.5996V48H53.4004V53.4004H48V54.5996H53.4004V60H54.5996V54.5996Z"
                fill="#FAFAFA"
              />
              <path
                d="M54.5996 38.5996H60V37.4004H54.5996V32H53.4004V37.4004H48V38.5996H53.4004V44H54.5996V38.5996Z"
                fill="#FAFAFA"
              />
              <path
                d="M54.5996 22.5996H60V21.4004H54.5996V16H53.4004V21.4004H48V22.5996H53.4004V28H54.5996V22.5996Z"
                fill="#FAFAFA"
              />
              <path
                d="M54.5996 6.59961H60V5.40039H54.5996V0H53.4004V5.40039H48V6.59961H53.4004V12H54.5996V6.59961Z"
                fill="#FAFAFA"
              />
              <path
                d="M70.5996 5.40039H76V6.59961H70.5996V12H69.4004V6.59961H64V5.40039H69.4004V0H70.5996V5.40039Z"
                fill="#FAFAFA"
              />
              <path
                d="M70.5996 21.4004H76V22.5996H70.5996V28H69.4004V22.5996H64V21.4004H69.4004V16H70.5996V21.4004Z"
                fill="#FAFAFA"
              />
              <path
                d="M70.5996 37.4004H76V38.5996H70.5996V44H69.4004V38.5996H64V37.4004H69.4004V32H70.5996V37.4004Z"
                fill="#FAFAFA"
              />
              <path
                d="M70.5996 53.4004H76V54.5996H70.5996V60H69.4004V54.5996H64V53.4004H69.4004V48H70.5996V53.4004Z"
                fill="#FAFAFA"
              />
              <path
                d="M86.5996 5.40039H92V6.59961H86.5996V12H85.4004V6.59961H80V5.40039H85.4004V0H86.5996V5.40039Z"
                fill="#FAFAFA"
              />
              <path
                d="M86.5996 21.4004H92V22.5996H86.5996V28H85.4004V22.5996H80V21.4004H85.4004V16H86.5996V21.4004Z"
                fill="#FAFAFA"
              />
              <path
                d="M86.5996 37.4004H92V38.5996H86.5996V44H85.4004V38.5996H80V37.4004H85.4004V32H86.5996V37.4004Z"
                fill="#FAFAFA"
              />
              <path
                d="M86.5996 53.4004H92V54.5996H86.5996V60H85.4004V54.5996H80V53.4004H85.4004V48H86.5996V53.4004Z"
                fill="#FAFAFA"
              />
              <path
                d="M102.6 54.5996H108V53.4004H102.6V48H101.4V53.4004H96V54.5996H101.4V60H102.6V54.5996Z"
                fill="#FAFAFA"
              />
              <path
                d="M102.6 38.5996H108V37.4004H102.6V32H101.4V37.4004H96V38.5996H101.4V44H102.6V38.5996Z"
                fill="#FAFAFA"
              />
              <path
                d="M102.6 22.5996H108V21.4004H102.6V16H101.4V21.4004H96V22.5996H101.4V28H102.6V22.5996Z"
                fill="#FAFAFA"
              />
              <path
                d="M102.6 6.59961H108V5.40039H102.6V0H101.4V5.40039H96V6.59961H101.4V12H102.6V6.59961Z"
                fill="#FAFAFA"
              />
            </svg>
          </div>
    )
}