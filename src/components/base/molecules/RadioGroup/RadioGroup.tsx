import clsx from 'clsx'
import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import { useFocusRing, useId } from 'react-aria'
import { UseFormRegisterReturn } from 'react-hook-form'

import { ErrorMessage, ErrorMessageProps } from '../../../case/error/ErrorMessage'

type Props = {
  label: string
  description?: string
  className?: string
  children?: ReactNode
} & ErrorMessageProps

const RadioGroup = ({ label, description, className, name, errors, children }: Props) => {
  const labelId = useId()
  const descriptionId = useId()

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      aria-describedby={description !== undefined ? descriptionId : undefined}
      className={clsx(className, '')}
    >
      <div id={labelId} className="text-lg font-bold">
        {label}
      </div>
      {description && (
        <p id={descriptionId} className="mt-1 text-sm">
          {description}
        </p>
      )}
      <div className={clsx({ 'ring-1 ring-red-400': errors?.[name] !== undefined }, 'mt-2')}>{children}</div>
      <ErrorMessage name={name} errors={errors} />
    </div>
  )
}

type ChildProps = {
  currentValue: string
  className?: string
} & UseFormRegisterReturn &
  Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'>

const RadioGroupChild = (
  { currentValue, className, children, ...props }: ChildProps,
  forwardedRef: ForwardedRef<HTMLInputElement>
) => {
  const labelId = useId()

  const isChecked = currentValue === props.id
  const { isFocused, focusProps } = useFocusRing()

  return (
    <div className={clsx(className)}>
      <input
        {...props}
        {...focusProps}
        ref={forwardedRef}
        type="radio"
        value={props.id}
        className="sr-only"
        aria-checked={isChecked}
        aria-labelledby={labelId}
      />
      <label
        id={labelId}
        htmlFor={props.id}
        className={clsx(
          { 'outline outline-2 outline-offset-2 outline-black': isFocused },
          'flex cursor-pointer items-center'
        )}
      >
        <div
          aria-hidden="false"
          className="mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-black"
        >
          {isChecked && <div className="h-2 w-2 rounded-full bg-black" />}
        </div>
        {children}
      </label>
    </div>
  )
}

RadioGroup.Child = forwardRef(RadioGroupChild)

export default RadioGroup
