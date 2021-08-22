import { AriaButtonProps } from '@react-types/button'
import clsx from 'clsx'
import { forwardRef } from 'react'
import { ForwardedRef, ReactNode, useRef } from 'react'
import { useButton } from 'react-aria'

import mergedRef from '~/src/utils/mergedRef'

type Props = {
  children?: ReactNode
  className?: string
} & AriaButtonProps

const SubmitButton = ({ children, className, ...props }: Props, forwardedRef: ForwardedRef<HTMLButtonElement>) => {
  const internalRef = useRef<HTMLButtonElement>(null)
  const ref = mergedRef<HTMLButtonElement>(forwardedRef, internalRef)
  const { buttonProps } = useButton(props, internalRef)

  return (
    <button
      {...buttonProps}
      ref={ref}
      type="submit"
      className={clsx(
        className,
        'flex items-center justify-center px-10 py-2 text-white bg-black rounded-md disabled:bg-gray-400'
      )}
    >
      {children}
    </button>
  )
}

const _SubmitButton = forwardRef(SubmitButton)

export default _SubmitButton
