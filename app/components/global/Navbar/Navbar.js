"use client";
import { useRef, useState, useEffect } from "react";
import Logo from "../../ui/Logo/Logo";
import Btn from "../../ui/Btn/Btn";
import MenuButton from "../../ui/Btn/MenuButton";
import MenuWrapper from "../../ui/MenuWrapper/MenuWrapper";
import gsap from "gsap";
import style from "./style.module.css";

export default function Navbar({ data }) {
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const navbarRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const tl = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

useEffect(() => {
  let ctx = gsap.context(() => {
    // Set initial visibility and start position
    gsap.set(navbarRef.current, { visibility: "visible" });
    gsap.fromTo(navbarRef.current,
      { yPercent: -150 },
      { yPercent: 0, duration: 1, ease: "power2.inOut" }
    );
    let mm = gsap.matchMedia();

    mm.add("(max-width: 1920px)", () => {
      gsap.set(navbarRef.current, {height: "64px"});
      tl.current = gsap.timeline({ paused: true });
      tl.current
        .fromTo(navbarRef.current,
          { maxWidth: "620px" },
        { maxWidth: "1240px", duration: 0.6, ease: "power2.inOut" }
      ).fromTo(navbarRef.current, {height: "64px"}, {height: "550px", borderRadius: "8px", duration: 0.5, ease: "power2.inOut"});
    });

    mm.add("(max-width: 768px)", () => {
      gsap.set(navbarRef.current, {height: "58px"});
      tl.current = gsap.timeline({ paused: true });
      tl.current
        .fromTo(navbarRef.current,
          { maxWidth: "620px" },
        { maxWidth: "1240px", duration: 0.6, ease: "power2.inOut" }
      ).fromTo(navbarRef.current, {height: "58px"}, {height: "calc(100dvh - 40px)", borderRadius: "8px", duration: 0.5, ease: "power2.inOut"});
    });
  }, navbarRef);

  return () => ctx.revert();
}, []);

  const handleMenuLinkClick = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (tl.current) {
      if (isOpen) {
        // Menu is closed: reverse timeline (collapse navbar)
        tl.current.reverse();
      } else {
        // Menu is open: play timeline forward (expand navbar)
        tl.current.play();
      }
    }
  }, [isOpen]);

  return (
    <>
    <nav className={style.navbarContainer}>
      <div className={style.navbarOverlay}></div>
      <div className={style.navbar} ref={navbarRef}>
        <div className={style.navbarBack}></div>
        <div className={style.navbarTop}>
        <MenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
        <Logo label={data.logo} ref={logoRef} />
        <Btn
          label="Let's Go"
          ref={menuRef}
        /></div>
        <MenuWrapper isOpen={isOpen} onLinkClick={handleMenuLinkClick} />
      </div>

    </nav>
    </>
  );
}
