"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { RoughEase } from "gsap/EasePack";
gsap.registerPlugin(ScrambleTextPlugin, RoughEase);

export default function Logo({ ref, label }) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function handleHover() {
      gsap.to(el, {
        duration: 0.5,
        ease: "rough",
        scrambleText: {
          text: "MADEBY©SANG",
          chars: "!@#$%^&*()-+",
          charsPerSecond: 10,
          scrambleDelay: 0.1,
        },
        stagger: {
          randomize: true,
          from: "center",
          each: 0.01,
        },
      });
    }

    function handleHoverEnd() {
      gsap.to(el, {
        duration: 0.5,
        ease: "rough",
        scrambleText: {
          text: "MADEBY©SANG",
          chars: "10",
          charsPerSecond: 10,
          scrambleDelay: 0.1,
        },
        stagger: {
          randomize: true,
          from: "center",
          each: 0.01,
        },
      });
    }

    el.addEventListener("mouseenter", handleHover);
    el.addEventListener("mouseleave", handleHoverEnd);

    return () => {
      el.removeEventListener("mouseenter", handleHover);
      el.removeEventListener("mouseleave", handleHoverEnd);
    };
  }, []);

  return (
    <span className="logo" ref={ref}>
      {label}
    </span>
  );
}
