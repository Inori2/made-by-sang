"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import style from "./style.module.css";

export default function Btn({
  label,
}) {
  const buttonRef = useRef(null);
  const splitRef = useRef([]);
  useEffect(() => {
    const el = buttonRef.current;
    let tl;

    let ctx = gsap.context(() => {
      gsap.registerPlugin(SplitText);
      const split0 = new SplitText(splitRef.current[0], { type: "chars" });
      const split1 = new SplitText(splitRef.current[1], { type: "chars" });

      tl = gsap.timeline({ paused: true });

      tl.to(buttonRef.current, {
        scale: 0.99,
        duration: 0.5,
        ease: "power2.inOut",
        borderRadius: "8px",
      }, 0);

      split0.chars.forEach((char, i) => {
        const char1 = split1.chars[i];
        if (char && char1) {
          tl.to([char, char1], {
            yPercent: -100,
            duration: 0.5,
            ease: "power2.inOut",
          }, Math.random() * 0.2);
        }
      });
    }, buttonRef);

    const onEnter = () => tl && tl.play();
    const onLeave = () => tl && tl.reverse();

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      ctx.revert();
    };
  }, []);
  return (
    <a href="mailto:[EMAIL_ADDRESS]" className={`${style.button}`} ref={buttonRef}>
      <div className={style.buttonContainer}>
        {Array.from({ length: 2 }).map((_, i) => (
          <span key={i} ref={(el) => (splitRef.current[i] = el)}>{label}</span>
        ))}
      </div>
    </a>
  );
}
