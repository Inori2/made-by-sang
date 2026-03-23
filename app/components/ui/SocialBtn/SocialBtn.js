"use client"
import { RiBehanceFill } from "@remixicon/react"
import gsap from "gsap"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import style from "./style.module.css"
export default function SocialBtn( {Icon = RiBehanceFill, href = ""} ) {
  const socialBtnRef = useRef(null)
  useGSAP(() => {
    const socialBtn = socialBtnRef.current
    
    const onHover = () => {
      gsap.to(socialBtn, {
        duration: 0.5,
        scale: 0.95,
        ease: "power2.inOut",
        backgroundColor: "#BEF264",
        color: "#09090b"
      })
    }
    const onLeave = () => {
      gsap.to(socialBtn, {
        duration: 0.5,
        scale: 1,
        ease: "power2.inOut",
        backgroundColor: "#fafafa",
        color: "#09090b"
      })
    }
    socialBtn.addEventListener("mouseenter", onHover)
    socialBtn.addEventListener("mouseleave", onLeave)
    return () => {
      socialBtn.removeEventListener("mouseenter", onHover)
      socialBtn.removeEventListener("mouseleave", onLeave)
    }
  }, { scope: socialBtnRef })
  return (
    <a href={href} target="_blank" className={style.socialBtn} ref={socialBtnRef}>
      <div className={style.socialBtnWrapper}>
        <div className={style.socialBtnIcon}>
          <Icon />
        </div>
      </div>
    </a>
  )
}