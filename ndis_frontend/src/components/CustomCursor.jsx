import { useEffect, useState, useRef } from 'react'

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const rafRef = useRef(null)
  const targetRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const animate = () => {
      const target = targetRef.current
      setPosition((prev) => ({
        x: prev.x + (target.x - prev.x) * 0.22,
        y: prev.y + (target.y - prev.y) * 0.22,
      }))
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible])

  useEffect(() => {
    const interactive = 'a, button, [role="button"], input, select, textarea'
    const handleMouseOver = (e) => {
      if (e.target.closest(interactive)) setIsHovering(true)
    }
    const handleMouseOut = (e) => {
      if (!e.relatedTarget?.closest(interactive)) setIsHovering(false)
    }
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`custom-cursor ${isHovering ? 'custom-cursor--hover' : ''}`}
      aria-hidden="true"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <span className="custom-cursor__glow" />
      <span className="custom-cursor__pointer">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="custom-cursor__arrow"
        >
          <path
            d="M4 4l7.2 17.2 3.2-6.4 6.4-3.2L4 4z"
            fill="url(#cursor-fill)"
            stroke="url(#cursor-stroke)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="cursor-fill" x1="4" y1="4" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-primary-400, #a78bfa)" />
              <stop offset="1" stopColor="var(--color-primary-600, #5b21b6)" />
            </linearGradient>
            <linearGradient id="cursor-stroke" x1="4" y1="4" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,255,255,0.9)" />
              <stop offset="1" stopColor="rgba(255,255,255,0.5)" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <span className="custom-cursor__tip" />
    </div>
  )
}

export default CustomCursor
