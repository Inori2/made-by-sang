"use client"
import style from "./style.module.css"
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

const scene = "/assets/scene-clean.splinecode";
const ITEMS = ["Index", "Works", "About", "Archive"];

export default function MenuWrapper({ isOpen }) {
  const pathname = usePathname();
  const span0Refs = useRef([]);
  const span1Refs = useRef([]);
  const liRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    const cleanups = [];

    liRefs.current.forEach((el, i) => {
      if (!el || !span0Refs.current[i] || !span1Refs.current[i]) return;

      const split0 = new SplitText(span0Refs.current[i], { type: "chars" });
      const split1 = new SplitText(span1Refs.current[i], { type: "chars" });

      const tl = gsap.timeline({ paused: true });
      split0.chars.forEach((char, ci) => {
        const char1 = split1.chars[ci];
        if (char && char1) {
          tl.to([char, char1], {
            yPercent: -100,
            duration: 0.5,
            ease: "power2.inOut",
          }, Math.random() * 0.2);
        }
      });

      const onEnter = () => tl.play();
      const onLeave = () => tl.reverse();

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        tl.kill();
        split0.revert();
        split1.revert();
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className={style.menuWrapper}>
      <div className={style.menuLeft}>
        <ul className={style.menuList}>
          {ITEMS.map((item, index) => {
            const href = item === "Index" ? "/" : `/${item.toLowerCase()}`;
            const isActive = pathname === href;
            return (
              <li key={index} className={style.menuListItem} ref={(el) => (liRefs.current[index] = el)}>
                <Link href={href}>
                  <div className={style.menuListItemContent} style={isActive ? { color: "var(--accent-300)" } : {}}>
                    <span>0{index + 1}</span>
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
      <div className={style.menuRight}>
        <Spline scene={scene} className={style.splineCanvas} />
      </div>
    </div>
  );
}