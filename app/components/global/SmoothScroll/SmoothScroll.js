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
    if (!containerRef.current) return;

    locoRef.current = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      lerp: 0.08,
    });

    // ✅ Sync Locomotive with ScrollTrigger
    window.addEventListener('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(containerRef.current, {
      scrollTop(value) {
        return arguments.length
          ? locoRef.current.scrollTo(value, { duration: 0, disableLerp: true })
          : (locoRef.current.scroll?.instance?.scroll?.y ?? window.scrollY);
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: containerRef.current.style.transform ? 'transform' : 'fixed',
    });

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('scroll', ScrollTrigger.update);
      ScrollTrigger.removeEventListener('refresh', () =>
        locoRef.current?.update(),
      );
      ScrollTrigger.killAll();
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
