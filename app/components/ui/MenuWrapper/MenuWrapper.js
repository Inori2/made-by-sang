'use client';
import style from './style.module.css';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import SocialBtn from '../SocialBtn/SocialBtn';
import {
  RiBehanceFill,
  RiInstagramFill,
  RiLinkedinFill,
} from '@remixicon/react';
import Status from '../Status/Status';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

const scene = '/scene/badge.splinecode';
const ITEMS = ['Index', 'Works', 'About', 'Archive'];

export default function MenuWrapper({ isOpen, onLinkClick, ref }) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const wrapperRef = useRef(null);
  const menuLeftRef = useRef(null);
  const menuCenterRef = useRef(null);
  const menuRightRef = useRef(null);
  const tlReveal = useRef(null);
  const delayedCallRef = useRef(null);
  const span0Refs = useRef([]);
  const span1Refs = useRef([]);
  const liRefs = useRef([]);
  const contentRefs = useRef([]);

  const handleLinkClick = () => {
    onLinkClick?.();
  };

  // Desktop detection
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Reveal/hide animation — synced with navbar expansion sequence
  // Sequence: 1) Navbar width expand (0.5s) → 2) Navbar height expand + MenuWrapper reveal (0.5s)
  useEffect(() => {
    if (!wrapperRef.current) return;

    gsap.set(
      [menuLeftRef.current, menuCenterRef.current, menuRightRef.current],
      {
        y: 50,
      },
    );
    gsap.set(contentRefs.current, { yPercent: 100 });
    gsap.set(wrapperRef.current, { opacity: 0, visibility: 'hidden' });

    tlReveal.current = gsap
      .timeline({ paused: true })
      .set(wrapperRef.current, { visibility: 'visible' })
      .to(wrapperRef.current, {
        opacity: 1,
        duration: 0.01,
      })
      .to(
        [menuLeftRef.current, menuCenterRef.current, menuRightRef.current],
        {
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: {
            each: 0.1,
            from: 'center',
          },
        },
        '<0.1',
      )
      .to(
        contentRefs.current,
        {
          yPercent: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.05,
        },
        '<0.1',
      );
  }, []);

  useEffect(() => {
    if (!tlReveal.current) return;
    // Cancel any pending delayed play
    if (delayedCallRef.current) delayedCallRef.current.kill();

    if (!isOpen) {
      // Opening: wait for navbar width expansion (0.5s) to complete, then play
      delayedCallRef.current = gsap.delayedCall(0.5, () =>
        tlReveal.current.play(),
      );
    } else {
      // Closing: reverse the menu items animation, then hide wrapper
      gsap.to(wrapperRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          wrapperRef.current.style.visibility = 'hidden';
        },
      });
      tlReveal.current.reverse();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;

    const cleanups = [];

    liRefs.current.forEach((el, i) => {
      if (!el || !span0Refs.current[i]) return;
      if (el.dataset.active === 'true') return; // active item keeps accent color and no hover tween

      const tl = gsap.timeline({ paused: true });

      tl.to(span0Refs.current[i], {
        color: 'var(--accent-300)',
        duration: 0.4,
        ease: 'power2.inOut',
      });

      const onEnter = () => tl.play();
      const onLeave = () => tl.reverse();

      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);

      cleanups.push(() => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        tl.kill();
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [isOpen]);

  return (
    <div
      className={style.menuWrapper}
      ref={(el) => {
        wrapperRef.current = el; // internal ref for animations
        if (ref) ref.current = el; // external ref for Navbar's scrollHeight
      }}
    >
      <div className={style.menuLeft} ref={menuLeftRef}>
        <div className={style.menuContainer}>
          <span className={style.menuListTitle}>Navigation</span>
          <ul>
            {ITEMS.map((item, index) => {
              const href = item === 'Index' ? '/' : `/${item.toLowerCase()}`;
              const currentPath =
                pathname?.endsWith('/') && pathname !== '/'
                  ? pathname.slice(0, -1)
                  : pathname;
              const isActive =
                href === '/'
                  ? currentPath === '/'
                  : currentPath?.startsWith(href);
              const activeStyle = isActive
                ? { color: 'var(--accent-300)' }
                : {};
              return (
                <li
                  key={index}
                  className={style.menuListItem}
                  ref={(el) => (liRefs.current[index] = el)}
                  data-active={isActive}
                >
                  <Link href={href} onClick={handleLinkClick}>
                    <div
                      className={style.menuListItemContent}
                      ref={(el) => (contentRefs.current[index] = el)}
                      style={activeStyle}
                    >
                      <div className={style.menuItemTextSlot}>
                        <span
                          ref={(el) => (span0Refs.current[index] = el)}
                          style={activeStyle}
                        >
                          {item}
                        </span>
                        <span
                          ref={(el) => (span1Refs.current[index] = el)}
                          aria-hidden="true"
                          style={activeStyle}
                        >
                          {item}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={style.contactContainer}>
          <div>
            <span className={style.menuListTitle}>Contact</span>
            <ul>
              <li>
                <Link href="mailto:trannhatsang2000@gmail.com">
                  trannhatsang2000@gmail.com
                </Link>
              </li>
            </ul>
          </div>
          <div className={style.menuSocialContainer}>
            <span className={style.menuListTitle}>Follow Me</span>
            <div className={style.menuSocialList}>
              <SocialBtn Icon={RiBehanceFill} href="" />
              <SocialBtn Icon={RiLinkedinFill} href="" />
              <SocialBtn Icon={RiInstagramFill} href="" />
            </div>
          </div>
          <div className={style.statusContainer}>
            <Status />
          </div>
        </div>
      </div>
      <div className={style.menuRight} ref={menuRightRef}>
        {isDesktop && <Spline scene={scene} className={style.splineCanvas} />}
      </div>
    </div>
  );
}
