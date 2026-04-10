'use client';
import style from './style.module.css';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

export default function MenuButton({ isOpen, toggleMenu }) {
  const menuButtonRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const textRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(TextPlugin);
      tl.current = gsap
        .timeline({ paused: true })
        .to(
          line1Ref.current,
          { y: 3, rotate: 45, duration: 0.5, ease: 'power2.inOut' },
          0,
        )
        .to(
          line2Ref.current,
          { y: -3, rotate: -45, duration: 0.5, ease: 'power2.inOut' },
          0,
        )
        .to(
          textRef.current,
          { text: 'Close', duration: 0.5, ease: 'power2.inOut' },
          0,
        );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (tl.current) {
      if (!isOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isOpen]);

  return (
    <div className={style.menuButton} ref={menuButtonRef} onClick={toggleMenu}>
      <span
        ref={textRef}
        style={{ display: 'inline-block', textAlign: 'left' }}
      >
        Menu
      </span>
      <div className={style.lineContainer}>
        <div className={style.line} ref={line1Ref}></div>
        <div className={style.line} ref={line2Ref}></div>
      </div>
    </div>
  );
}
