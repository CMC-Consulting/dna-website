"use client"
import { useEffect, useRef } from "react"
import '@/styles/Particles-animation.css';

export default function ParticlesBg() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    for (let i = 0; i < 100; i++) {
      const dot = document.createElement("div")
      dot.className = "particle"

      // position
      dot.style.top = Math.random() * 100 + "%"
      dot.style.left = Math.random() * 100 + "%"

      // size
      const size = Math.random() * 4 + 1
      dot.style.width = size + "px"
      dot.style.height = size + "px"

      // random direction (X + Y)
      const moveX = (Math.random() - 0.5) * 100 // trái/phải
      const moveY = (Math.random() - 0.5) * 100 // lên/xuống

      dot.style.setProperty("--move-x", `${moveX}px`)
      dot.style.setProperty("--move-y", `${moveY}px`)

      // random time
      dot.style.animationDuration = Math.random() * 6 + 6 + "s"
      dot.style.animationDelay = Math.random() * 10 + "s"

      container?.appendChild(dot)
    }
  }, [])
  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden"></div>
  )
}