import { ErrorMessage as _ErrorMessage } from '@hookform/error-message'
import { DeepMap, FieldError } from 'react-hook-form'

type Props = {
  name: string
  errors: DeepMap<Record<string, unknown>, FieldError>
}

const ErrorMessage = ({ name, errors }: Props) => {
  return (
    <_ErrorMessage
      name={name}
      errors={errors}
      render={({ message }) => (
        <p role="alert" className="mt-2 text-xs text-red-400">
          {message}
        </p>
      )}
    />
  )
}

export default ErrorMessage
