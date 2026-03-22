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
  const overlayRef = useRef(null);
  const menuWrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const tl = useRef(null);
  const isOpenRef = useRef(isOpen)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

useEffect(() => {
  let ctx = gsap.context(() => {
    // Set initial visibility and start position
    gsap.set(navbarRef.current, { visibility: "visible" });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.fromTo(navbarRef.current,
      { yPercent: -150 },
      { yPercent: 0, duration: 1, ease: "power2.inOut" }
    );

    const desktopBreakpoint = 1023;
    const mobileBreakpoint = 748;
    let maxWidth = "";

    function checkWidth() {
      if (window.innerWidth > desktopBreakpoint) {
        maxWidth = "calc(50% - 1rem)";
      } 
      else if (window.innerWidth < mobileBreakpoint) {
        maxWidth = "calc(100% - 2rem)";
      }
      else {
        maxWidth = "100%";
      }
      if (isOpen) {
        gsap.set(navbarRef.current, {
          maxWidth: maxWidth
        })
      }
    }
    
    function handleScroll() {
      if (!isOpenRef.current) {
        setIsOpen(true); // triggers the existing useEffect to reverse tl
       }
    }

    checkWidth();
    window.addEventListener("resize", checkWidth);
    window.addEventListener("scroll", handleScroll);

    let mm = gsap.matchMedia();

    mm.add("(max-width: 1920px)", () => {
      const navbarHeight = 64;
      gsap.set(navbarRef.current, {height: `${navbarHeight}px`});
      tl.current = gsap.timeline({ paused: true });
      tl.current
        .fromTo(navbarRef.current,
          { maxWidth: maxWidth },
        { maxWidth: "100%", duration: 0.6, ease: "power2.inOut" }
      ).fromTo(navbarRef.current, {height: `${navbarHeight}px`}, {height: () => menuWrapperRef.current.scrollHeight + navbarHeight - 20, 
        borderRadius: "8px", 
        duration: 0.5, 
        ease: "power2.inOut"})
        .fromTo(overlayRef.current, {opacity: 0}, {opacity: 1, duration: 0.5, ease: "power2.inOut"}, "<");
    });

    return () => {
      window.removeEventListener("resize", checkWidth);
      window.removeEventListener("scroll", handleScroll);
    }
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
        tl.current.invalidate().play();
      }
    }
  }, [isOpen]);


  useEffect(() => {
  isOpenRef.current = isOpen;
}, [isOpen]);

  return (
    <>
    <div className={style.navbarOverlay} ref={overlayRef}></div>
    <nav className={style.navbarContainer}>
      <div className={style.navbar} ref={navbarRef}>
        <div className={style.navbarBack}></div>
        <div className={style.navbarTop}>
        <MenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
        <Logo label={data.logo} ref={logoRef} />
        <Btn
          label="Say Hello"
          ref={menuRef}
        /></div>
        <MenuWrapper isOpen={isOpen} onLinkClick={handleMenuLinkClick} ref={menuWrapperRef} />
      </div>
    </nav>
    </>
  );
}
