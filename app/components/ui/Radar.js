'use client'

import { useRef } from 'react'
import RadarSquare from './RadarSquare'
import styles from './Radar.module.css'

export default function Radar({ containerRef, className = '' }) {
  const radarBoundsRef = useRef(null)

  return (
    <div ref={radarBoundsRef} className={`${styles.radar} ${className}`}>
      <div className={styles.radarGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}></div>
        ))}
      </div>

      <RadarSquare
        containerRef={containerRef}
        boundsRef={radarBoundsRef}
      />
    </div>
  )
}
