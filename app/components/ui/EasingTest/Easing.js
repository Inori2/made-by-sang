'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

const Easing = () => {
  useEffect(() => {
    const ease = CustomEase.create('custom', 'M0,0 C0.126,0.382 0.264,1 1,1');
    gsap.to('.box', {
      x: 300,
      duration: 2,
      ease: 'custom',
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div className="container">
      <div className="box">Easing Test</div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .box {
          width: 100px;
          height: 100px;
          background-color: #3498db;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};
