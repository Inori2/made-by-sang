"use client";
import { useEffect, useRef } from "react";

export default function TitleChanger() {
  const timerRef = useRef(null);
  const originalTitleRef = useRef(null);

  useEffect(() => {
    originalTitleRef.current = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        timerRef.current = setTimeout(() => {
          document.title = "Comeback I Miss You";
        }, 2000);
      } else {
        clearTimeout(timerRef.current);
        document.title = originalTitleRef.current;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(timerRef.current);
    };
  }, []);

  return null;
}
