import { useEffect, useState } from 'react'

import useCallbackRef from './useCallbackRef'

const useIntersection = <T extends HTMLElement>() => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const { current, ref } = useCallbackRef<T>()
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
        }
      })
    })
    if (current !== null) {
      observer.observe(current)
    }

    return () => {
      if (current !== null) {
        observer.unobserve(current)
      }
    }
  })
  return {
    isIntersecting,
    ref,
  }
}

export default useIntersection
