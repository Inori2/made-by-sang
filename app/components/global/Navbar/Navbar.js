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
    console.log(isOpen)
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(navbarRef.current, {
        yPercent: -150,
        duration: 1,
        ease: "power2.inOut",
      });
    }, navbarRef);

    tl.current = gsap.timeline({
      paused: true,
    });
    
    // Base CSS width is 960px. Timeline animates it up to 1240px.
    tl.current.to(navbarRef.current, {
      maxWidth: "1240px",
      duration: 0.5,
      ease: "power2.inOut",
    });

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
    <div className={style.navbar} ref={navbarRef}>
      <MenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
        <Logo label={data.logo} ref={logoRef} />
      <Btn
        label="Let's work together"
        ref={menuRef}
      />
    </div>
    <MenuWrapper isOpen={isOpen} onLinkClick={handleMenuLinkClick} />
    </nav>
    </>
  );
}
