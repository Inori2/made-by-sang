"use client"
import style from "./style.module.css"
import Spline from "@splinetool/react-spline";
import { useRef, useEffect } from "react";
import gsap from "gsap";
const scene = "/assets/scene-clean.splinecode"
export default function MenuWrapper({ isOpen }) {
  return (
    <div className={style.menuWrapper}>
      <div className={style.menuLeft}></div>
      <div className={style.menuRight}>
        <Spline scene={scene} className={style.splineCanvas} />
      </div>
    </div>
  );
}