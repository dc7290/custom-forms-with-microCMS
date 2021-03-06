import { AriaTextFieldProps } from '@react-types/textfield'
import clsx from 'clsx'
import { ForwardedRef, forwardRef, useRef } from 'react'
import { useTextField } from 'react-aria'
import { UseFormRegisterReturn } from 'react-hook-form'

import { ErrorMessage, ErrorMessageProps } from '~/src/components/case/error/ErrorMessage'
import { newLine } from '~/src/utils/cms/textProcessing'
import mergedRef from '~/src/utils/mergedRef'

type Props = {
  label: string
  description?: string
  className?: string
} & ErrorMessageProps &
  UseFormRegisterReturn &
  Omit<AriaTextFieldProps, 'onChange'>

const TextArea = (
  { label, errors, className, onChange, ...props }: Props,
  forwardedRef: ForwardedRef<HTMLTextAreaElement>
) => {
  const internalRef = useRef<HTMLTextAreaElement | null>(null)
  const ref = mergedRef<HTMLTextAreaElement>(forwardedRef, internalRef)
  const { inputProps, labelProps, descriptionProps } = useTextField(
    {
      inputElementType: 'textarea',
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
      <textarea
        {...inputProps}
        ref={ref}
        onChange={onChange}
        className={clsx({ 'ring-1 ring-red-400': inputProps['aria-invalid'] }, 'mt-2 min-h-[160px] w-full rounded p-2')}
      />
      <ErrorMessage name={props.name} errors={errors} />
    </div>
  )
}

const _TextArea = forwardRef(TextArea)

export default _TextArea
