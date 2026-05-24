import { useState, useEffect } from 'react'

// TODO: replace with real API polling (e.g. GET /api/listeners)
export function useListenerCount(): number {
  const [count, setCount] = useState(42)

  useEffect(() => {
    // Stub: simulates a live count fluctuating around 42
    const id = setInterval(() => {
      setCount(40 + Math.floor(Math.random() * 6))
    }, 10_000)
    return () => clearInterval(id)
  }, [])

  return count
}
