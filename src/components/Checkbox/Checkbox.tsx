import clsx from 'clsx'
import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes, useState } from 'react'
import { useId, useFocusRing } from 'react-aria'
import { UseFormRegisterReturn } from 'react-hook-form'

import { newLine } from '~/src/utils/cms/textProcessing'

import { ErrorMessage, ErrorMessageProps } from '../ErrorMessage'

type Props = {
  isRequired?: boolean
  description?: string
  className?: string
} & ErrorMessageProps &
  UseFormRegisterReturn &
  Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'>

const checkIconSrc =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMC44MjgiIGhlaWdodD0iNy45MTQiIHZpZXdCb3g9IjAgMCAxMC44MjggNy45MTQiPjxwYXRoIGQ9Ik0xNCw5LDguNSwxNC41LDYsMTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00LjU4NiAtNy41ODYpIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+'

const Checkbox = (
  { isRequired, description, errors, className, children, onChange, ...inputProps }: Props,
  forwardedRef: ForwardedRef<HTMLInputElement>
) => {
  const labelId = useId()
  const descriptionId = useId()

  const { isFocused, focusProps } = useFocusRing()

  const [isChecked, setIsChecked] = useState(false)

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
          setIsChecked(e.target.checked)
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
          { 'outline-2 outline-black outline outline-offset-2': isFocused },
          'flex items-center cursor-pointer'
        )}
      >
        <div aria-hidden="false" className="flex justify-center items-center mr-2 w-4 h-4 border border-black">
          {isChecked && <img src={checkIconSrc} width={11} height={8} alt="チェック" />}
        </div>
        {children}
        {isRequired && <div className="py-0.5 px-2 ml-3 text-white bg-red-600">必須</div>}
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
