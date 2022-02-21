import { AriaTextFieldProps } from '@react-types/textfield'
import clsx from 'clsx'
import { ForwardedRef, forwardRef, useRef } from 'react'
import { useTextField } from 'react-aria'
import { UseFormRegisterReturn } from 'react-hook-form'

import { ErrorMessage, ErrorMessageProps } from '~/src/components/case/error/ErrorMessage'
import { newLine } from '~/src/utils/cms/textProcessing'
import mergedRef from '~/src/utils/mergedRef'

type Props = {
  description?: string
  className?: string
} & ErrorMessageProps &
  UseFormRegisterReturn &
  Omit<AriaTextFieldProps, 'onChange'>

const TextField = (
  { label, errors, className, onChange, ...props }: Props,
  forwardedRef: ForwardedRef<HTMLInputElement>
) => {
  const internalRef = useRef<HTMLInputElement | null>(null)
  const ref = mergedRef<HTMLInputElement>(forwardedRef, internalRef)
  const { inputProps, labelProps, descriptionProps } = useTextField(
    {
      label,
      validationState: errors?.[props.name] === undefined ? 'valid' : 'invalid',
      ...props,
    },
    internalRef
  )

  return (
    <div className={clsx(className)}>
      <label {...labelProps} className="flex cursor-pointer items-center">
        <div className="text-lg font-bold">{label}</div>
        {props.isRequired && <div className="ml-3 bg-red-600 py-0.5 px-2 text-white">必須</div>}
      </label>
      {props.description && (
        <p
          {...descriptionProps}
          className="mt-1 text-sm"
          dangerouslySetInnerHTML={{ __html: newLine(props.description) }}
        />
      )}
      <input
        {...inputProps}
        ref={ref}
        onChange={onChange}
        className={clsx({ 'ring-1 ring-red-400': inputProps['aria-invalid'] }, 'mt-2 w-full rounded p-2')}
      />
      <ErrorMessage name={props.name} errors={errors} />
    </div>
  )
}

const _TextField = forwardRef(TextField)

export default _TextField
