import { useCallback, useState } from 'react'

const useCallbackRef = <T extends HTMLElement>() => {
  const [current, setCurrent] = useState<T | null>(null)
  const ref = useCallback((element: T | null) => {
    if (element !== null) {
      setCurrent(element)
    }
  }, [])

  return { current, ref }
}

export default useCallbackRef
