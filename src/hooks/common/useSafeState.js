import { useCallback, useState } from 'react'
import useIsMounted from './useIsMounted'

export default function useSafeState(initialValue) {
  const [state, setState] = useState(initialValue)
  const isMounted = useIsMounted()

  const updateState = useCallback(
    newValue => {
      if (isMounted.current) {
        setState(newValue)
      }
    },
    [isMounted],
  )

  return [state, updateState]
}
