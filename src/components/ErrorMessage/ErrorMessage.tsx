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
          className="inline-block relative z-10 p-2 mt-3 min-w-[200px] text-xs text-red-700 bg-white rounded-md shadow-[0_0_8px_rgba(0,0,0,0.16)]"
          role="alert"
        >
          {message}
          <div
            className="[clip-path:polygon(0_50%,0_100%,100%_100%)] absolute -top-6 left-3 w-4 h-7 bg-white"
            aria-hidden="true"
          />
        </div>
      )}
    />
  )
}

export default ErrorMessage
