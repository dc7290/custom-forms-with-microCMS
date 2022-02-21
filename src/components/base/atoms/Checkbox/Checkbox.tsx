import clsx from 'clsx'
import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes } from 'react'
import { useId, useFocusRing } from 'react-aria'
import { UseFormRegisterReturn } from 'react-hook-form'

import { ErrorMessage, ErrorMessageProps } from '~/src/components/case/error/ErrorMessage'
import { newLine } from '~/src/utils/cms/textProcessing'

type Props = {
  isChecked: boolean
  isRequired?: boolean
  description?: string
  className?: string
} & ErrorMessageProps &
  UseFormRegisterReturn &
  Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'>

const checkIconSrc =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMC44MjgiIGhlaWdodD0iNy45MTQiIHZpZXdCb3g9IjAgMCAxMC44MjggNy45MTQiPjxwYXRoIGQ9Ik0xNCw5LDguNSwxNC41LDYsMTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00LjU4NiAtNy41ODYpIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+'

const Checkbox = (
  { isChecked, isRequired, description, errors, className, children, onChange, ...inputProps }: Props,
  forwardedRef: ForwardedRef<HTMLInputElement>
) => {
  const labelId = useId()
  const descriptionId = useId()

  const { isFocused, focusProps } = useFocusRing()

  return (
    <div className={clsx(className)}>
      <input
        {...inputProps}
        {...focusProps}
        type="checkbox"
        ref={forwardedRef}
        className="sr-only"
        onChange={(e) => {
          onChange(e)
        }}
        aria-checked={isChecked}
        aria-required={isRequired}
        aria-labelledby={labelId}
        aria-describedby={description !== undefined ? descriptionId : undefined}
      />
      <label
        id={labelId}
        htmlFor={inputProps.id}
        className={clsx(
          { 'ring-1 ring-red-400': errors?.[inputProps.name] !== undefined },
          { 'outline outline-2 outline-offset-2 outline-black': isFocused },
          'flex cursor-pointer items-center'
        )}
      >
        <div aria-hidden="false" className="mr-2 flex h-4 w-4 items-center justify-center border border-black">
          {isChecked && <img src={checkIconSrc} width={11} height={8} alt="チェック" />}
        </div>
        {children}
        {isRequired && <div className="ml-3 bg-red-600 py-0.5 px-2 text-white">必須</div>}
      </label>
      {description && (
        <p id={descriptionId} className="mt-1 text-sm" dangerouslySetInnerHTML={{ __html: newLine(description) }} />
      )}
      <ErrorMessage name={inputProps.name} errors={errors} />
    </div>
  )
}

const _Checkbox = forwardRef(Checkbox)

export default _Checkbox
