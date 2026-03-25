'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);
  const locoRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // ✅ init locomotive v5
    const loco = new LocomotiveScroll({
      el,
      smooth: true,
      lerp: 0.08,
    });

    locoRef.current = loco;

    // ✅ just refresh ScrollTrigger once
    ScrollTrigger.refresh();

    return () => {
      // cleanup GSAP
      ScrollTrigger.getAll().forEach((t) => t.kill());

      // cleanup locomotive
      loco.destroy();
      locoRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} data-scroll-container>
      {children}
    </div>
  );
}
