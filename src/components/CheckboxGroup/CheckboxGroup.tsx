import clsx from 'clsx'
import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react'
import { useFocusRing, useId } from 'react-aria'
import { UseFormRegisterReturn } from 'react-hook-form'

import { newLine } from '~/src/utils/cms/textProcessing'

import { ErrorMessage, ErrorMessageProps } from '../ErrorMessage'

type Props = {
  label: string
  isRequired?: boolean
  description?: string
  className?: string
  children?: ReactNode
} & ErrorMessageProps

const CheckboxGroup = ({ label, isRequired, description, className, name, errors, children }: Props) => {
  const labelId = useId()
  const descriptionId = useId()

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      aria-describedby={description !== undefined ? descriptionId : undefined}
      className={clsx(className, '')}
    >
      <div id={labelId} className="flex items-center">
        <div className="font-bold text-lg">{label}</div>
        {isRequired && <div className="ml-3 px-2 py-0.5 text-white bg-red-600">必須</div>}
      </div>
      {description && (
        <p id={descriptionId} className="mt-1 text-sm" dangerouslySetInnerHTML={{ __html: newLine(description) }} />
      )}
      <div className={clsx({ 'ring-1 ring-red-400': errors?.[name] !== undefined }, 'mt-2')}>{children}</div>
      <ErrorMessage name={name} errors={errors} />
    </div>
  )
}

type ChildProps = {
  className?: string
} & UseFormRegisterReturn &
  Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'>

const arrowSrc =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMC44MjgiIGhlaWdodD0iNy45MTQiIHZpZXdCb3g9IjAgMCAxMC44MjggNy45MTQiPjxwYXRoIGQ9Ik0xNCw5LDguNSwxNC41LDYsMTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00LjU4NiAtNy41ODYpIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+'

const CheckboxGroupChild = (
  { className, onChange, children, ...props }: ChildProps,
  forwardedRef: ForwardedRef<HTMLInputElement>
) => {
  const labelId = useId()

  const { isFocused, focusProps } = useFocusRing()

  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className={clsx(className)}>
      <input
        {...props}
        {...focusProps}
        ref={forwardedRef}
        type="checkbox"
        value={props.id}
        className="sr-only"
        onChange={(e) => {
          onChange(e)
          setIsChecked(e.target.checked)
        }}
        aria-checked={isChecked}
        aria-labelledby={labelId}
      />
      <label
        id={labelId}
        htmlFor={props.id}
        className={clsx(
          { 'outline outline-offset-2 outline-2 outline-black': isFocused },
          'flex items-center cursor-pointer'
        )}
      >
        <div aria-hidden="false" className="flex justify-center items-center w-4 h-4 mr-2 border border-black">
          {isChecked && <img src={arrowSrc} width={11} height={8} alt="チェック" />}
        </div>
        {children}
      </label>
    </div>
  )
}

CheckboxGroup.Child = forwardRef(CheckboxGroupChild)

export default CheckboxGroup
