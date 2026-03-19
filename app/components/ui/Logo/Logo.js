"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { RoughEase } from "gsap/EasePack";
gsap.registerPlugin(ScrambleTextPlugin, RoughEase);

export default function Logo({ ref, label }) {

  return (
    <span className="logo" ref={ref}>
      {label}
    </span>
  );
}
