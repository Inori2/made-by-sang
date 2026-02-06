import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function TextAnimation({
  children,
  className = "",
  useScrollTrigger = false,
  start = "top 80%",
  end = "top 20%",
  stagger = 0.04,
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const split = new SplitText(textRef.current, {
        type: "chars, words",
        charsClass: "char",
      });

      const play = () => {
        split.chars.forEach((char, i) => {
          char.style.animationDelay = `${i * stagger}s`;
          char.classList.add("text-fade-char");
        });

        textRef.current.classList.add("text-blink");
      };

      const reset = () => {
        split.chars.forEach((char) => {
          char.classList.remove("text-fade-char");
          char.style.animationDelay = "0s";
        });

        textRef.current.classList.remove("text-blink");
      };

      if (useScrollTrigger) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start,
          end,
          onEnter: play,
          onLeaveBack: reset,
        });
      } else {
        play();
      }

      // cleanup splitText
      return () => {
        reset();
        split.revert();
      };
    },
    { scope: containerRef, dependencies: [useScrollTrigger, start, end, stagger] }
  );

  return (
    <div ref={containerRef} className={className}>
      <span ref={textRef}>{children}</span>
    </div>
  );
}
