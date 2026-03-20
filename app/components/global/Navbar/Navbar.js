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
    gsap.fromTo(navbarRef.current,
      { yPercent: -150 },
      { yPercent: 0, duration: 1, ease: "power2.inOut" }
    );
  }, navbarRef);

  tl.current = gsap.timeline({ paused: true });

  tl.current
    .fromTo(navbarRef.current,
      { maxWidth: "960px" },
      { maxWidth: "1240px", borderRadius: "8px", duration: 0.5, ease: "power2.inOut" }
    );

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
        <MenuWrapper isOpen={isOpen} onLinkClick={handleMenuLinkClick} />
      </div>

    </nav>
    </>
  );
}
