"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { RoughEase } from "gsap/EasePack";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(SplitText, RoughEase, ScrambleTextPlugin, TextPlugin);

export default function Btn({
  label,
  className,
}) {

  return (
    <button className={`button`} >
      <span>{label}</span>
    </button>
  );
}
