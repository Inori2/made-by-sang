"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);
  const locoRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Init locomotive
    locoRef.current = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      lerp: 0.08, // smoothness
    });

    return () => {
      locoRef.current?.destroy();
      locoRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} data-scroll-container>
      {children}
    </div>
  );
}
