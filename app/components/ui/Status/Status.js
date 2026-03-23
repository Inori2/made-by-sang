"use client"
import style from "./style.module.css"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

export default function Status() {
  const container = useRef(null)
  const statusDot = useRef(null)
  useGSAP(() => {
    gsap.to(statusDot.current, {
      autoAlpha: 1,
      duration: 1,
      repeat: -1,
      yoyo: true,
    })
  }, {scope: container})
  return (
    <div className={style.status} ref={container}>
      <span className={style.statusTitle}>Status</span>
      <div className={style.statusWrapper}>
        <div className={style.statusDot} ref={statusDot}></div>
        <span className={style.statusText}>AVAILABLE FOR WORK</span>
      </div>
    </div>
  )}
