import { useCallback } from 'react'

export default function useCombinedRefs(...refs) {
  const combinedRefs = useCallback(
    element => {
      refs.forEach(ref => {
        if (!ref) return
        if (typeof ref === 'function') ref(element)
        else ref.current = element
      })
    },
    [refs],
  )

  return combinedRefs
}
