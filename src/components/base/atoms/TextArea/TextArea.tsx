import { ErrorMessage } from '@hookform/error-message'
import { AriaTextFieldProps } from '@react-types/textfield'
import clsx from 'clsx'
import { TextareaHTMLAttributes } from 'react'
import { ForwardedRef, forwardRef, LabelHTMLAttributes, useRef } from 'react'
import { useTextField } from 'react-aria'
import { DeepMap, FieldError, UseFormRegisterReturn } from 'react-hook-form'

import mergedRef from '~/src/utils/mergedRef'

type Props = {
  label: string
  errors: DeepMap<Record<string, unknown>, FieldError>
  className?: string
} & UseFormRegisterReturn &
  Omit<AriaTextFieldProps, 'onChange'>

const TextArea = (
  { label, errors, className, onChange, ...props }: Props,
  forwardedRef: ForwardedRef<HTMLTextAreaElement>
) => {
  const internalRef = useRef<HTMLTextAreaElement | null>(null)
  const ref = mergedRef<HTMLTextAreaElement>(forwardedRef, internalRef)
  const { inputProps, labelProps } = useTextField(
    {
      label,
      validationState: errors[props.name] === undefined ? 'valid' : 'invalid',
      ...props,
    },
    internalRef
  ) as {
    inputProps: TextareaHTMLAttributes<HTMLTextAreaElement>
    labelProps: LabelHTMLAttributes<HTMLLabelElement>
  }

  return (
    <div>
      <div className="flex justify-between">
        <label {...labelProps} className="relative">
          {label}
          {props.isRequired && (
            <div className="absolute -top-1 -right-1 text-[10px] text-red-400 translate-x-full">※</div>
          )}
        </label>
        <textarea
          {...inputProps}
          ref={ref}
          onChange={onChange}
          className={clsx(className, 'flex-none w-3/4 min-h-[200px] ml-5 border border-gray-400')}
        />
      </div>
      <ErrorMessage
        name={props.name}
        errors={errors}
        render={({ message }) => (
          <p role="alert" className="mt-2 text-xs text-red-400">
            {message}
          </p>
        )}
      />
    </div>
  )
}

const _TextArea = forwardRef(TextArea)

export default _TextArea
