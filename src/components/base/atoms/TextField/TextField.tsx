import { AriaTextFieldProps } from '@react-types/textfield'
import clsx from 'clsx'
import { ForwardedRef, forwardRef, InputHTMLAttributes, LabelHTMLAttributes, useRef } from 'react'
import { useTextField } from 'react-aria'
import { DeepMap, FieldError, UseFormRegisterReturn } from 'react-hook-form'

import { ErrorMessage } from '~/src/components/case/error/ErrorMessage'
import mergedRef from '~/src/utils/mergedRef'

type Props = {
  label: string
  errors: DeepMap<Record<string, unknown>, FieldError>
  className?: string
} & UseFormRegisterReturn &
  Omit<AriaTextFieldProps, 'onChange'>

const TextField = (
  { label, errors, className, onChange, ...props }: Props,
  forwardedRef: ForwardedRef<HTMLInputElement>
) => {
  const internalRef = useRef<HTMLInputElement | null>(null)
  const ref = mergedRef<HTMLInputElement>(forwardedRef, internalRef)
  const { inputProps, labelProps } = useTextField(
    {
      label,
      validationState: errors[props.name] === undefined ? 'valid' : 'invalid',
      ...props,
    },
    internalRef
  ) as {
    inputProps: InputHTMLAttributes<HTMLInputElement>
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
        <input
          {...inputProps}
          ref={ref}
          onChange={onChange}
          className={clsx(className, 'flex-none w-3/4 ml-5 border border-gray-400')}
        />
      </div>
      <ErrorMessage name={props.name} errors={errors} />
    </div>
  )
}

const _TextField = forwardRef(TextField)

export default _TextField
