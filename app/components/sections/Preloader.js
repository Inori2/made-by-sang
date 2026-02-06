import styles from "./styles.module.css"
import GridPattern from "../global/GridPattern";

export default function Preloader() {
  const lines = 69;
  const gap = 6;
  let x = 0;
  let y = 0;
  let progress = 0;

  // TODO: Adjust font size to be responsive
  return (
    <div className={styles.preloader}>
      <GridPattern amount={4} position="absolute" />
      <div className={styles.topContainer}>
          <div className={styles.listContainer}>
            <span>SITEMAP:</span>
            <ul>
              {["INDEX", "ABOUT", "WORK", "PLAYGROUND", "CONTACT"].map(
                (item, index) => (
                  <li key={index}>
                    <span>{`>`}</span>
                    <span>{item}</span>
                  </li>
                ),
              )}
            </ul></div>
          <div className={`hidden sm:block ${styles.rulerIndicator}`}>
            <svg
              width="409"
              height="12"
              viewBox="0 0 409 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {Array.from({ length: lines }).map((_, i) => {
                const x = i * gap + 0.25;
                const y2 = i % 3 === 1 ? 12 : 6;

                return (
                  <line
                    key={i}
                    x1={x}
                    x2={x}
                    y1={0}
                    y2={y2}
                    stroke="white"
                    strokeWidth={0.5}
                  />
                );
              })}
            </svg>
          </div>
          <div className={styles.pattern}>
            <svg
              width="108"
              height="60"
              viewBox="0 0 108 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
      </div>
      <div className={styles.middleContainer}>
        <div className="flex flex-col gap-1">
          <span>{`X: ${x}.0px`}</span>
          <span>{`Y: ${y}.0px`}</span>
        </div>
        <div>{progress.toFixed(0)}.0</div>
        <div>
          <span>FOLIO '26</span>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className="flex flex-row gap-1 items-center">
          <div className="h-1.5 w-1.5 bg-neutral-50"></div>
          <div className="flex flex-row gap-1 items-end">
            <span>INITIALISING</span>
            <span>...</span>
          </div>
        </div>
        <div className="w-21.5 flex flex-col gap-2">
          <div className="relative w-full h-21.5 border-[0.3px] border-neutral-500 flex justify-center items-center">
            <div className="absolute inset-0 w-full h-full flex flex-wrap">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1/2 h-1/2 border-[0.3px] border-neutral-500"
                ></div>
              ))}
            </div>
            <div className="relative h-2 w-2 bg-neutral-50"></div>
          </div>
          <div className="w-full h-2.5 border border-neutral-50 p-0.5">
            <div className="w-full h-full bg-neutral-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
