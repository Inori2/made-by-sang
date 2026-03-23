/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @type {import("react").FC<HeroProps>}
 */
"use client";
import GridPattern from "@/app/components/global/GridPattern/GridPattern";
import { PrismicRichText } from "@prismicio/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import style from "./style.module.css";

gsap.registerPlugin(SplitText, useGSAP);

const melbourneTimeFormatter = new Intl.DateTimeFormat("en-AU", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Australia/Melbourne",
});

const Hero = ({ slice }) => {
  const [melbourneTime, setMelbourneTime] = useState("--:--");
  const heroRef = useRef(null);
  const headingRefs = useRef([]);
  const copyRefs = useRef([]);
  const utilityRefs = useRef([]);
  const videoContainerRef = useRef(null);
  const videoFrameRef = useRef(null);
  const mediaRevealRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      setMelbourneTime(melbourneTimeFormatter.format(new Date()));
    };

    updateTime();

    const intervalId = window.setInterval(updateTime, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const mediaUrl = slice.primary.video?.url;

  useGSAP(
    () => {
      const heroElement = heroRef.current;
      const headingElements = headingRefs.current.filter(Boolean);
      const copyElements = copyRefs.current.filter(Boolean);
      const utilityElements = utilityRefs.current.filter(Boolean);
      const videoContainerElement = videoContainerRef.current;
      const videoFrameElement = videoFrameRef.current;
      const mediaRevealElement = mediaRevealRef.current;
      const splitInstances = [];
      let tl;
      let cancelled = false;
      let rafId = 0;
      let removeMouseTracking = null;
      let skewResetTimer = null;

      const buildAnimation = () => {
        if (cancelled) return;

        const paragraphLines = [];

        headingElements.forEach((heading) => {
          gsap.set(heading, { yPercent: 100 });
        });

        gsap.set(copyElements, { autoAlpha: 0 });

        utilityElements.forEach((utility) => {
          gsap.set(utility, { autoAlpha: 0, y: 16 });
        });

        if (videoFrameElement && mediaRevealElement) {
          const { width, height } = videoFrameElement.getBoundingClientRect();
          const finalVideoWidth = width;
          const finalVideoHeight = height;
          const initialSquareSize = Math.max(
            18,
            Math.min(finalVideoWidth, finalVideoHeight) * 0.16
          );

          gsap.set(videoFrameElement, {
            width: initialSquareSize,
            height: initialSquareSize,
            transformOrigin: "50% 50%",
          });

          tl = gsap.timeline({
            defaults: {
              ease: "power3.out",
            },
          });

          tl.to(
            videoFrameElement,
            {
              width: finalVideoWidth,
              height: finalVideoHeight,
              duration: 1.05,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(videoFrameElement, {
                  clearProps: "width,height,transformOrigin",
                });
              },
            },
            0
          );
        }

        copyElements.forEach((copy) => {
          copy.querySelectorAll("p").forEach((paragraph) => {
            const split = new SplitText(paragraph, {
              type: "lines",
              linesClass: style.copyLine,
            });

            split.lines.forEach((line) => {
              line.classList.add(style.copyLine);

              if (!line.parentElement?.classList.contains(style.lineMask)) {
                const mask = document.createElement("div");
                mask.className = style.lineMask;
                line.parentNode.insertBefore(mask, line);
                mask.appendChild(line);
              }
            });

            splitInstances.push(split);
            paragraphLines.push(...split.lines);
          });
        });

        gsap.set(paragraphLines, { yPercent: 100, autoAlpha: 0 });

        tl ??= gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        });

        tl.to(
          headingElements,
          {
            yPercent: 0,
            duration: 1.1,
            stagger: 0.14,
          },
          0
        )
          .to(
            copyElements,
            {
              autoAlpha: 1,
              duration: 0.01,
              stagger: 0.1,
            },
            0
          )
          .to(
            paragraphLines,
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: 0.9,
              stagger: 0.1,
            },
            0
          )
          .to(
            utilityElements,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.08,
            },
            "-=0.1"
          );
      };

      const setupMouseTracking = () => {
        if (!heroElement || !videoContainerElement || !videoFrameElement) return;
        if (!window.matchMedia("(min-width: 992px)").matches) return;

        const xTo = gsap.quickTo(videoFrameElement, "x", {
          duration: 0.6,
          ease: "power3.out",
        });
        const skewTo = gsap.quickTo(videoFrameElement, "skewX", {
          duration: 0.35,
          ease: "power2.out",
        });
        let lastOffset = 0;

        const handleMouseMove = (event) => {
          const bounds = heroElement.getBoundingClientRect();
          const containerBounds = videoContainerElement.getBoundingClientRect();
          const frameBounds = videoFrameElement.getBoundingClientRect();
          const progress = (event.clientX - bounds.left) / bounds.width;
          const clamped = Math.max(0, Math.min(1, progress));
          const maxOffset = Math.max(
            0,
            (containerBounds.width - frameBounds.width) / 2
          );
          const offset = (clamped - 0.5) * maxOffset * 2;
          const delta = offset - lastOffset;
          const skew = gsap.utils.clamp(-3, 3, delta * 0.08);

          xTo(offset);
          skewTo(skew);
          lastOffset = offset;

          window.clearTimeout(skewResetTimer);
          skewResetTimer = window.setTimeout(() => {
            skewTo(0);
          }, 90);
        };

        const handleMouseLeave = () => {
          xTo(0);
          skewTo(0);
          lastOffset = 0;
          window.clearTimeout(skewResetTimer);
        };

        heroElement.addEventListener("mousemove", handleMouseMove);
        heroElement.addEventListener("mouseleave", handleMouseLeave);

        removeMouseTracking = () => {
          heroElement.removeEventListener("mousemove", handleMouseMove);
          heroElement.removeEventListener("mouseleave", handleMouseLeave);
          window.clearTimeout(skewResetTimer);
          xTo(0);
          skewTo(0);
        };
      };

      const queueBuildAnimation = () => {
        rafId = window.requestAnimationFrame(() => {
          rafId = window.requestAnimationFrame(buildAnimation);
        });
      };

      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          if (!cancelled) {
            queueBuildAnimation();
            setupMouseTracking();
          }
        });
      } else {
        queueBuildAnimation();
        setupMouseTracking();
      }

      return () => {
        cancelled = true;
        window.cancelAnimationFrame(rafId);
        window.clearTimeout(skewResetTimer);
        removeMouseTracking?.();
        tl?.kill();
        splitInstances.forEach((split) => split.revert());
      };
    },
    { scope: heroRef }
  );

  return (
    <>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={style.hero}
        ref={heroRef}
      >
        <div className={style.contentContainer}>
          <div className={style.top}>
            <h1>
              <span className={style.headingMask}>
                <span
                  className={style.headingInner}
                  ref={(el) => {
                    headingRefs.current[0] = el;
                  }}
                >
                  {slice.primary.heading_1}
                </span>
              </span>
            </h1>
            <div
              className={style.copy}
              ref={(el) => {
                copyRefs.current[0] = el;
              }}
            >
              <PrismicRichText field={slice.primary.paragraph_2} />
            </div>
          </div>

          <div
            className={style.videoContainer}
            ref={videoContainerRef}
          >
            <div
              className={style.video}
              ref={videoFrameRef}
            >
              <div
                className={style.videoReveal}
                ref={mediaRevealRef}
              >
                {mediaUrl ? (
                  <video
                    src={mediaUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <div className={style.videoFallback}></div>
                )}
              </div>
            </div>
          </div>

          <div className={style.bottom}>
            <div
              className={style.copy}
              ref={(el) => {
                copyRefs.current[1] = el;
              }}
            >
              <PrismicRichText field={slice.primary.paragraph_1} />
            </div>
            <h1>
              <span className={style.headingMask}>
                <span
                  className={style.headingInner}
                  ref={(el) => {
                    headingRefs.current[1] = el;
                  }}
                >
                  {slice.primary.heading_2}
                </span>
              </span>
            </h1>
          </div>

          <div className={style.footer}>
            <div
              className={style.scroll}
              ref={(el) => {
                utilityRefs.current[0] = el;
              }}
            >
              [SCROLL FOR MORE]
            </div>

            <div
              className={style.time}
              ref={(el) => {
                utilityRefs.current[1] = el;
              }}
            >
              MEL, AU {melbourneTime}
            </div>
          </div>
        </div>
      </section>
      <GridPattern />
    </>
  );
};

export default Hero;
