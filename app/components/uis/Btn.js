"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { RoughEase } from "gsap/EasePack";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(SplitText, RoughEase, ScrambleTextPlugin, TextPlugin);

export default function Btn({
  ref,
  label,
  className,
  isMenuOpen,
  setIsMenuOpen,
}) {
  const squaresRef = useRef([]);
  const textRef = useRef(null);
  const squareContainerRef = useRef(null);

  const squarePos = [
    "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
    "right-0 top-0 translate-x-1/2 -translate-y-1/2",
    "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
  ];

  useEffect(() => {
    if (!ref?.current) return;

    const getDisplayText = () => (isMenuOpen ? "close" : label);

    const handleMouseEnter = () => {
      gsap.to(squareContainerRef.current, {
        scale: 0.9,
        duration: 0.5,
        ease: "power2.out",
        transformOrigin: "center",
      });

      gsap.to(textRef.current, {
        scrambleText: {
          text: getDisplayText(),
          chars: "!@#$%^&*()-+",
        },
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(squareContainerRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        transformOrigin: "center",
      });

      gsap.to(textRef.current, {
        scrambleText: {
          text: getDisplayText(),
          chars: "!@#$%^&*()-+",
        },
        overwrite: "auto",
      });
    };

    const handleMouseClick = () => {
      setIsMenuOpen((prev) => {
        const next = !prev;

        gsap.to(textRef.current, {
          text: next ? "close" : label,
          overwrite: "auto",
        });

        return next;
      });
    };

    const el = ref.current;

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("click", handleMouseClick);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("click", handleMouseClick);
    };
  }, [isMenuOpen, label, ref]);

  return (
    <button className={`relative ${className}`} ref={ref}>
      <div
        className="pointer-events-none absolute inset-0"
        ref={squareContainerRef}
      >
        {squarePos.map((pos, index) => (
          <div
            key={index}
            ref={(el) => (squaresRef.current[index] = el)}
            className={`absolute h-[3px] w-[3px] bg-(--secondary-50) ${pos}`}
          />
        ))}
      </div>

      <span ref={textRef}>{label}</span>
    </button>
  );
}
