'use client'
import { useEffect, useRef } from 'react'

export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return

    let mx = 0, my = 0
    let tx = 0, ty = 0
    let raf: number

    const move = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`
    }

    const animate = () => {
      tx += (mx - tx) * 0.12
      ty += (my - ty) * 0.12
      trail.style.transform = `translate(${tx - 15}px, ${ty - 15}px)`
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', move)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return { cursorRef, trailRef }
}
