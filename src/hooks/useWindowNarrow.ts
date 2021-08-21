import { useEffect } from 'react'
import { useMedia } from 'react-use'

const useWindowNarrow = () => {
  const isNarrow = useMedia('(max-width: 359px)', false)
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]')
    const value = isNarrow ? 'width=360' : 'width=device-width,initial-scale=1'
    if (viewport !== null) {
      viewport.setAttribute('content', value)
    }
  }, [isNarrow])
}

export default useWindowNarrow
