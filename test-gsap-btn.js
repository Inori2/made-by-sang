      const chars = [1,2,3];
      const tl = gsap.timeline();
      chars.forEach((char, i) => {
         tl.to([], {}, Math.random()*0.2);
      });
