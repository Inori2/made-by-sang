"use client";

import { useEffect, useRef } from "react";

export default function useMousePosition({
  threshold = 0, // px: ignore movement smaller than this
  clampToBounds = false, // clamp inside a container ref
  raf = true, // update using requestAnimationFrame
} = {}) {
  const boundsRef = useRef(null);

  // store raw mouse position
  const mouseRef = useRef({
    x: 0,
    y: 0,
  });

  // store last emitted position (for threshold)
  const lastRef = useRef({
    x: 0,
    y: 0,
  });

  const rafId = useRef(null);
  const pendingEvent = useRef(null);

  useEffect(() => {
    const update = (e) => {
      let x = e.clientX;
      let y = e.clientY;

      // Clamp inside container bounding box if enabled
      if (clampToBounds && boundsRef.current) {
        const rect = boundsRef.current.getBoundingClientRect();

        // clamp to edges
        x = Math.max(rect.left, Math.min(x, rect.right));
        y = Math.max(rect.top, Math.min(y, rect.bottom));

        // convert to local coordinates (0 -> width/height)
        x = x - rect.left;
        y = y - rect.top;
      }

      // Threshold filtering
      const dx = x - lastRef.current.x;
      const dy = y - lastRef.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist < threshold) return;

      lastRef.current.x = x;
      lastRef.current.y = y;

      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    const onMove = (e) => {
      if (!raf) {
        update(e);
        return;
      }

      pendingEvent.current = e;

      if (rafId.current) return;

      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        if (!pendingEvent.current) return;
        update(pendingEvent.current);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [threshold, clampToBounds, raf]);

  return {
    // attach this ref to a container if you want bounding box clamp
    boundsRef,

    // always-updated values (no re-render)
    positionRef: mouseRef,

    // helper getter
    get: () => mouseRef.current,
  };
}
