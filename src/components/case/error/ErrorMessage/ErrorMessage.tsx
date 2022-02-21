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
        <div
          className="relative z-10 mt-3 inline-block min-w-[200px] rounded-md bg-white p-2 text-xs text-red-700 shadow-[0_0_8px_rgba(0,0,0,0.16)]"
          role="alert"
        >
          {message}
          <div
            className="absolute -top-6 left-3 h-7 w-4 bg-white [clip-path:polygon(0_50%,0_100%,100%_100%)]"
            aria-hidden="true"
          />
        </div>
      )}
    />
  )
}

export default ErrorMessage
