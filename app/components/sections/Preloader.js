import styles from "./styles.module.css"
import GridPattern from "../global/GridPattern";
import Radar from "../uis/Radar";
import Pattern from "../uis/Pattern";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { RoughEase } from "gsap/EasePack";
import useMousePosition from "../../hooks/useMousePosition";

gsap.registerPlugin(SplitText, TextPlugin, useGSAP);

export default function Preloader() {
  const container = useRef(null);
  const rulerRef = useRef(null);
  const indicatorRef = useRef(null);
  const indicatorSquareRef = useRef(null);
  const indicatorTextRef = useRef(null);
  const indicatorEllipsisRef = useRef(null);
  const countNumber = useRef(null);
  const folioRef = useRef(null);
  const progressContainerRef = useRef(null);
  const progressBar = useRef(null);
  const xRef = useRef(null);
  const yRef = useRef(null);
  const listContainerRef = useRef(null);
  const lines = 69;
  const gap = 6;
  const progress = useRef({ value: 0 });

  const { positionRef } = useMousePosition({
    threshold: 2,
    clampToBounds: false,
    raf: true,
  });

  useGSAP(() => {
    if (!container.current) return;

    //Appear Animation
    const AppearAnimation = () => {
      //Sitemap Animation
      const SitemapAnimation = () => {
        const q = gsap.utils.selector(listContainerRef.current);
        const heading = q(".sitemap-heading")[0];
        const listItems = q(".text-content");

        const tl = gsap.timeline();

        tl.from(heading, {
          text: "",
          stagger: 0.1,
          duration: 1.2,
          ease: "power3.out",
        })
        listItems.forEach((span, i) => {
          const originalText = span.textContent;
          gsap.set(span, { text: "" });
          tl.to(span, {
            text: originalText,
            duration: 1,
            transformOrigin: "left",
            ease: "power3.out",
          }, i * 0.1);
        });

        return tl;
      };

      //Ruler Animation
      const RulerAnimation = () => {
        if (!rulerRef.current) return;
        const ruler = rulerRef.current.querySelectorAll("line");
        const tl = gsap.timeline();
        tl.from(ruler, {
          autoAlpha: 0,
          duration: 0.5,
          stagger: {
            each: 0.01,
            from: "random",
          },
          ease: RoughEase.config({
            strength: 1,
            points: 10,
            randomize: true,
            taper: "none",
            clamp: false,
          }),
        });
        return tl;
      } 

      //X,Y Indicator Animation
      const XYIndicatorAnimation = () => {
        if (!xRef.current || !yRef.current || !folioRef.current) return;
        const xIndicator = xRef.current;
        const yIndicator = yRef.current;
        const folio = folioRef.current.querySelectorAll("span");
        const tl = gsap.timeline();
        tl.from([xIndicator, yIndicator], {
          text: "",
          duration: 1.2,
          ease: "power3.out",
          stagger: {
            each: 0.03,
            from: "start",
          },
        });
        tl.from(folio, {
          text: "",
          duration: 1.2,
          ease: "power3.out",
          stagger: {
            each: 0.1,
            from: "start",
          },
        }, "-=1");
        return tl;
      }

      //Indicate

      const master = gsap.timeline();
      master.add(SitemapAnimation(), 0);
      master.add(RulerAnimation(), 0);
      master.add(XYIndicatorAnimation(), 0);
      return master;
    };

    //Loading Animation
    const LoadingAnimation = () => {
      //Indicator Animation
      const IndicatorAnimation = () => {
        if (!indicatorRef.current) return;
        const indicator = indicatorRef.current;
        const indicatorText = indicatorTextRef.current;
        const indicatorDots = indicatorEllipsisRef.current;
        const square = indicatorSquareRef.current;
        let splitDotsInstance = [];
        // Split text into chars
        let splitDots = SplitText.create(indicatorDots, {
          type: "chars",
          charsClass: "chars",
        });

        splitDotsInstance.push(splitDots);


        const dotsTl = gsap.timeline({ repeat: -1 })
        gsap.set([splitDots.chars, square], {
          autoAlpha: 0,
        })
        dotsTl.to([splitDots.chars, square], {
          autoAlpha: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
        })
        .to([splitDots.chars, square], {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
        })
      };
      
      //Count to 100
      const CountTo100 = () => {
        gsap.to(progress, {
        duration: 3,
        value: 100,
        ease: "power3.out",
        onUpdate: () => {
           if (countNumber.current) countNumber.current.textContent = `${Math.round(progress.value)}.0`;
           if (progressBar.current) progressBar.current.style.width = `${progress.value}%`;
        },
        onComplete: () => {
          let splitText = SplitText.create(countNumber.current, {
            type: "chars",
            charsClass: "chars",
          });

          splitText.chars.forEach((char) => {
            char.classList.add("text-blink", "text-fade-in");
            char.style.animationDelay = `${Math.random() * 0.8}s`;

          })
          gsap.to(countNumber.current, {
            delay: 0.5,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power3.out",
          })
          gsap.to(progressContainerRef.current, {
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            onComplete: () => {
              progressContainerRef.current.classList.add("text-fade-in","text-blink")
            }
          })
        }
      })
      };

      IndicatorAnimation();
      CountTo100();
    }

    //Ending Animation
    const EndingAnimation = () => {
      
    }

    //Ruler Animation
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
    const master = gsap.timeline({
      onComplete: () => {
        gsap.ticker.add(updateMousePosition);
      }
    });
    master.add(AppearAnimation(), 0);
    master.add(LoadingAnimation());
    master.add(EndingAnimation()  );
    return () => {
      gsap.ticker.remove(updateMousePosition);
    };
  }, { scope: container });

  return (
    <div className={styles.preloader} ref={container}>
      <GridPattern amount={4} position="absolute" />
      <div className={styles.topContainer}>
          <div className={styles.listContainer} ref={listContainerRef}>
            <span className="sitemap-heading">SITEMAP:</span>
            <ul>
              {["INDEX", "ABOUT", "WORK", "PLAYGROUND", "CONTACT"].map(
                (item, index) => (
                  <li key={index}>
                    <span className="text-content">{`>`}</span>
                    <span className="text-content">{item}</span>
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
              ref={rulerRef}
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
          <span ref={xRef}>X: 0.0px</span>
          <span ref={yRef}>Y: 0.0px</span>
        </div>
        <div ref={countNumber}>0.0</div>
        <div ref={folioRef}>
          <span>FOLIO '26</span>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={`${styles.indicator}`} ref={indicatorRef}>
          <div className={styles.square} ref={indicatorSquareRef}></div>
          <div>
            <span ref={indicatorTextRef}>INITIALISING</span>
            <span ref={indicatorEllipsisRef}>...</span>
          </div>
        </div>
        <div className={styles.progressContainer} ref={progressContainerRef}>
          <div className={styles.progressBar} ref={progressBar}></div>
        </div>
        <div className={styles.radarContainer}>
          <Radar containerRef={container}/>
        </div>
      </div>
    </div>
  );
}
