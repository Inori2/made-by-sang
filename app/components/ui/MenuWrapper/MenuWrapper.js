"use client"
import style from "./style.module.css"
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

const scene = "/assets/scene-clean.splinecode";
const ITEMS = ["Index", "Works", "About", "Archive"];

export default function MenuWrapper({ isOpen, onLinkClick }) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const wrapperRef = useRef(null);
  const menuLeftRef = useRef(null);
  const menuCenterRef = useRef(null);
  const menuRightRef = useRef(null);
  const tlReveal = useRef(null);
  const delayedCallRef = useRef(null);
  const span0Refs = useRef([]);
  const span1Refs = useRef([]);
  const liRefs = useRef([]);

  const handleLinkClick = () => {
    onLinkClick?.();
  };

  // Desktop detection
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Reveal/hide animation — synced with navbar expansion sequence
  // Sequence: 1) Navbar width expand (0.5s) → 2) Navbar height expand + MenuWrapper reveal (0.5s)
  useEffect(() => {
    if (!wrapperRef.current) return;

    gsap.set([menuLeftRef.current, menuCenterRef.current, menuRightRef.current], {
      y: 50,
    });

    tlReveal.current = gsap.timeline({ paused: true })
      .to([menuLeftRef.current, menuCenterRef.current, menuRightRef.current], {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: {
          each: 0.1,
          from: "center",
        },
        onComplete: () => {
          wrapperRef.current.style.position = "relative";
          wrapperRef.current.style.top = "0";
        }
      }, "<0.1"); // Start 0.1s after clipPath begins
  }, []);

  useEffect(() => {
    if (!tlReveal.current) return;
    // Cancel any pending delayed play
    if (delayedCallRef.current) delayedCallRef.current.kill();

    if (!isOpen) {
      // Opening: wait for navbar width expansion (0.5s) to complete, then play
      delayedCallRef.current = gsap.delayedCall(0.5, () => tlReveal.current.play());
    } else {
      // Closing: reverse immediately (navbar collapses, menu hides first)
      tlReveal.current.reverse();
    }
  }, [isOpen]);

  // Hover char stagger animation
useEffect(() => {
  if (isOpen) return;

  gsap.registerPlugin(SplitText);
  const cleanups = [];

  liRefs.current.forEach((el, i) => {
    if (!el || !span0Refs.current[i] || !span1Refs.current[i]) return;

    let tl;

    // ✅ Use gsap.context() scoped to each li — same as Btn
    const ctx = gsap.context(() => {
      const split0 = new SplitText(span0Refs.current[i], { type: "chars" });
      const split1 = new SplitText(span1Refs.current[i], { type: "chars" });

      tl = gsap.timeline({ paused: true });

      split0.chars.forEach((char, ci) => {
        const char1 = split1.chars[ci];
        if (char && char1) {
          tl.to([char, char1], {
            color: "var(--accent-300)",
            yPercent: -100,
            duration: 0.5,
            ease: "power2.inOut",
          }, Math.random() * 0.2); // ✅ same stagger approach as Btn
        }
      });
    }, el);

    const onEnter = () => tl && tl.play();
    const onLeave = () => tl && tl.reverse();

    // ✅ Attach to the li element, not Link
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    cleanups.push(() => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      ctx.revert(); // ✅ clean up like Btn does
    });
  });

  return () => cleanups.forEach((fn) => fn());
}, [isOpen]);

  return (
    <div
      className={style.menuWrapper}
      ref={wrapperRef}
      style={{position: "absolute", top: "76px"}}
    >
      <div className={style.menuLeft} ref={menuLeftRef}>
        <ul className={style.menuList}>
          <span>Navigation</span>
          {ITEMS.map((item, index) => {
            const href = item === "Index" ? "/" : `/${item.toLowerCase()}`;
            const isActive = pathname === href;
            return (
              <li key={index} className={style.menuListItem} ref={(el) => (liRefs.current[index] = el)}>
                <Link href={href} onClick={handleLinkClick}>
                  <div className={style.menuListItemContent} style={isActive ? { color: "var(--accent-300)" } : {}}>
                    <div className={style.menuItemTextSlot}>
                      <span ref={(el) => (span0Refs.current[index] = el)}>{item}</span>
                      <span ref={(el) => (span1Refs.current[index] = el)} aria-hidden="true">{item}</span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={style.menuCenter} ref={menuCenterRef}>
        
      </div>
      <div className={style.menuRight} ref={menuRightRef}>
        {isDesktop && <Spline scene={scene} className={style.splineCanvas} />}
      </div>
    </div>
  );
}