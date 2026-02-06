'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import useMousePosition from '../../hooks/useMousePosition'
import styles from './RadarSquare.module.css'

export default function RadarSquare({
  containerRef,
  boundsRef,
  className = '',
}) {
  const squareRef = useRef(null)

  const { positionRef } = useMousePosition({
    threshold: 2,
    clampToBounds: false,
    raf: true,
  })

  useEffect(() => {
    const update = () => {
      const squareEl = squareRef.current
      const radarEl = boundsRef?.current
      const containerEl = containerRef?.current

      if (!squareEl || !radarEl || !containerEl) return

      const { x: mouseX, y: mouseY } = positionRef.current

      const containerBounds = containerEl.getBoundingClientRect()
      const radarBounds = radarEl.getBoundingClientRect()

      // Mouse -> container local
      const containerLocalX = mouseX - containerBounds.left
      const containerLocalY = mouseY - containerBounds.top

      // Normalize to 0..1 (and clamp so it never goes outside)
      const nx = Math.max(0, Math.min(containerLocalX / containerBounds.width, 1))
      const ny = Math.max(0, Math.min(containerLocalY / containerBounds.height, 1))

      // Map into radar space
      const radarX = nx * radarBounds.width
      const radarY = ny * radarBounds.height

      const squareW = squareEl.offsetWidth
      const squareH = squareEl.offsetHeight

      // Center the square on the mapped point
      const clampedX = Math.max(0, Math.min(radarX - squareW / 2, radarBounds.width - squareW))
      const clampedY = Math.max(0, Math.min(radarY - squareH / 2, radarBounds.height - squareH))

      gsap.to(squareEl, {
        x: clampedX,
        y: clampedY,
        ease: 'power3.out',
        duration: 0.35,
        overwrite: true,
      })
    }

    gsap.ticker.add(update)
    return () => gsap.ticker.remove(update)
  }, [boundsRef, containerRef, positionRef])

  return (
    <div
      ref={squareRef}
      className={`${styles.radarSquare} ${className}`}
    />
  )
}
