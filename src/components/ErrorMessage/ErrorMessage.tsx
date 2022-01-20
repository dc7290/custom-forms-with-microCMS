import { ErrorMessage as _ErrorMessage } from '@hookform/error-message'
import { FieldErrors } from 'react-hook-form'

export type Props = {
  name: string
  errors?: FieldErrors
}

const ErrorMessage = ({ name, errors }: Props) => {
  return (
    <_ErrorMessage
      name={name}
      errors={errors}
      render={({ message }) => (
        <p role="alert" className="mt-2 text-xs text-red-400 leading-tight">
          {message}
        </p>
      )}
    />
  )
}

export default ErrorMessage
