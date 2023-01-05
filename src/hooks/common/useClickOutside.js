import { useEffect } from 'react'
import useLatest from './useLatest'

export default function useClickOutside(ref, handler, attached = true) {
  const latestHandler = useLatest(handler)

  useEffect(() => {
    if (!attached) return

    const handleClick = e => {
      if (!ref.current) return
      if (!ref.current.contains(e.target)) latestHandler.current()
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref, latestHandler, attached])
}
