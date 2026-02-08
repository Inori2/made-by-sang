import styles from "./styles.module.css"
import GridPattern from "../global/GridPattern";
import Radar from "../uis/Radar";
import Pattern from "../uis/Pattern";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import useMousePosition from "../../hooks/useMousePosition";

gsap.registerPlugin(SplitText, useGSAP);

export default function Preloader() {
  const container = useRef(null);
  const countNumber = useRef();
  const progressBar = useRef();
  const xRef = useRef();
  const yRef = useRef();
  const lines = 69;
  const gap = 6;
  let progress = { value: 0 };

  const { positionRef } = useMousePosition({
    threshold: 2,
    clampToBounds: false,
    raf: true,
  });

  useGSAP(() => {
    // Middle Container
    // Count to 100
    gsap.to(progress, {
      delay: 1,
      duration: 3,
      value: 100,
      ease: "power3.out",
      onUpdate: () => {
        countNumber.current.textContent = `${Math.round(progress.value)}.0`
        progressBar.current.style.width = `${progress.value}%`
      }
    })

    // Mouse Position Tracking for X, Y indicators
    const updateMousePosition = () => {
      if (!container.current) return;

      const { x, y } = positionRef.current;
      const containerBounds = container.current.getBoundingClientRect();

      // Calculate container-relative position
      const containerX = x - containerBounds.left;
      const containerY = y - containerBounds.top;
      const textX = Math.max(0, Math.min(containerX, containerBounds.width));
      const textY = Math.max(0, Math.min(containerY, containerBounds.height));

      // Update indicator text
      if (xRef.current) xRef.current.textContent = `X: ${textX.toFixed(0)}.0px`;
      if (yRef.current) yRef.current.textContent = `Y: ${textY.toFixed(0)}.0px`;
    };

    gsap.ticker.add(updateMousePosition);
    return () => gsap.ticker.remove(updateMousePosition);
  }, { scope: container });

  return (
    <div className={styles.preloader} ref={container}>
      <GridPattern amount={4} position="absolute" />
      <div className={styles.topContainer}>
          <div className={`list-container ${styles.listContainer}`}>
            <span className="list-heading">SITEMAP:</span>
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
          <Pattern />
      </div>
      <div className={`middle-container ${styles.middleContainer}`}>
        <div className={styles.mouseIndicator}>
          <span ref={xRef}>{`X: 0.0px`}</span>
          <span ref={yRef}>{`Y: 0.0px`}</span>
        </div>
        <div ref={countNumber}>0.0</div>
        <div>
          <span>FOLIO '26</span>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.indicator}>
          <div className={styles.square}></div>
          <div>
            <span>INITIALISING</span>
            <span>...</span>
          </div>
        </div>
        <div className={styles.radarContainer}>
          <Radar containerRef={container} />
          <div className={styles.progressContainer}>
            <div className={styles.progressBar} ref={progressBar}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
