"use client"
import style from "./style.module.css"
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
const scene = "/assets/scene-clean.splinecode"
export default function MenuWrapper({ isOpen }) {
  return (
    <div className={style.menuWrapper}>
      <div className={style.menuLeft}>
        <ul className={style.menuList}>
          {["Index", "Works", "About", "Playground"].map((item, index) => (
            <li key={index} className={style.menuListItem}>
              <Link href={item === "Index" ? "/" : `/${item.toLowerCase()}`}>
                <div>
                  <span>0{index + 1}</span>
                  <span>{item}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.menuRight}>
        <Spline scene={scene} className={style.splineCanvas} />
      </div>
    </div>
  );
}