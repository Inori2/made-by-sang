'use client';
import { useRef, useState, useEffect } from 'react';
import Logo from '../../ui/Logo/Logo';
import Btn from '../../ui/Btn/Btn';
import MenuButton from '../../ui/Btn/MenuButton';
import MenuWrapper from '../../ui/MenuWrapper/MenuWrapper';
import gsap from 'gsap';
import style from './style.module.css';

export default function Navbar({ data }) {
  const logoRef = useRef(null);
  const navbarRef = useRef(null);
  const navbarTopRef = useRef(null);
  const overlayRef = useRef(null);
  const menuWrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const tl = useRef(null);
  const isOpenRef = useRef(isOpen);

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  useEffect(() => {
    const desktopBreakpoint = 1023;
    const mobileBreakpoint = 768;
    const collapsedBorderRadius = '4px';

    const getNavbarHeight = () => {
      const top = navbarTopRef.current;
      const navbar = navbarRef.current;
      if (!top || !navbar) return 64;

      const computed = window.getComputedStyle(navbar);
      const paddingTop = parseFloat(computed.paddingTop) || 0;
      const paddingBottom = parseFloat(computed.paddingBottom) || 0;

      return top.offsetHeight + paddingTop + paddingBottom;
    };

    let ctx = gsap.context(() => {
      const getCollapsedMaxWidth = () => {
        if (window.innerWidth > desktopBreakpoint) {
          return 'calc(50% - 1rem)';
        }

        if (window.innerWidth < mobileBreakpoint) {
          return '100%';
        }

        return '100%';
      };

      const applyCollapsedState = () => {
        gsap.set(navbarRef.current, {
          maxWidth: getCollapsedMaxWidth(),
          height: `${getNavbarHeight()}px`,
          borderRadius: collapsedBorderRadius,
        });
      };

      // Set initial visibility and start position
      gsap.set(navbarRef.current, { visibility: 'visible' });
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.fromTo(
        navbarRef.current,
        { yPercent: -150 },
        { yPercent: 0, duration: 1, ease: 'power2.inOut' },
      );

      applyCollapsedState();

      function checkWidth() {
        if (isOpenRef.current) {
          applyCollapsedState();
        }
      }

      function handleScroll() {
        if (!isOpenRef.current) {
          setIsOpen(true);
        }
      }

      window.addEventListener('resize', checkWidth);
      window.addEventListener('scroll', handleScroll);

      let mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        tl.current = gsap.timeline({
          paused: true,
          onReverseComplete: applyCollapsedState,
        });

        tl.current
          .fromTo(
            navbarRef.current,
            { maxWidth: getCollapsedMaxWidth },
            { maxWidth: '100%', duration: 0.6, ease: 'power2.inOut' },
          )
          .fromTo(
            navbarRef.current,
            {
              height: `${getNavbarHeight()}px`,
              borderRadius: collapsedBorderRadius,
            },
            {
              height: () =>
                menuWrapperRef.current.scrollHeight + getNavbarHeight() - 75,
              borderRadius: '8px',
              duration: 0.5,
              ease: 'power2.inOut',
            },
          )
          .fromTo(
            overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: 'power2.inOut' },
            '<',
          );
      });

      return () => {
        window.removeEventListener('resize', checkWidth);
        window.removeEventListener('scroll', handleScroll);
        mm.revert();
      };
    }, navbarRef);

    return () => ctx.revert();
  }, []);

  const handleMenuLinkClick = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    isOpenRef.current = isOpen;

    if (tl.current) {
      if (isOpen) {
        // Menu is closed: reverse timeline (collapse navbar)
        tl.current.reverse();
      } else {
        // Menu is open: play timeline forward (expand navbar)
        tl.current.invalidate().restart();
      }
    }
  }, [isOpen]);

  return (
    <>
      <div className={style.navbarOverlay} ref={overlayRef}></div>
      <nav className={style.navbarContainer}>
        <div className={style.navbar} ref={navbarRef}>
          <div className={style.navbarBack}></div>
          <div className={style.navbarTop} ref={navbarTopRef}>
            <Logo label={data.logo} ref={logoRef} />
            <MenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
          </div>
          <MenuWrapper
            isOpen={isOpen}
            onLinkClick={handleMenuLinkClick}
            ref={menuWrapperRef}
          />
        </div>
      </nav>
    </>
  );
}
