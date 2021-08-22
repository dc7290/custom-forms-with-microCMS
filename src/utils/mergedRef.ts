import { ForwardedRef, MutableRefObject } from 'react'

const mergedRef =
  <T extends HTMLElement>(forwardedRef: ForwardedRef<T>, internalRef: MutableRefObject<T | null>) =>
  (e: T | null) => {
    if (typeof forwardedRef === 'function') {
      forwardedRef(e)
    } else if (forwardedRef !== null) {
      forwardedRef.current = e
    }

    internalRef.current = e
  }

export default mergedRef
