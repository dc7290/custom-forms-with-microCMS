import clsx from 'clsx'

import { FormState } from '../ContactForm/ContactForm'

type Props = {
  className?: string
} & Omit<FormState, 'data'>

const Progress = ({ progress, isSending, isError, className }: Props) => {
  return (
    <div className={clsx(className, 'relative')}>
      <div className="absolute inset-x-0 top-4 w-full h-px bg-gray-200" />
      <div className="flex relative justify-between">
        <div className="flex flex-col items-center bg-white">
          <div
            className={clsx(
              progress !== 'input' && !isError && 'border-2 border-red-500',
              progress === 'input' && !isError && 'border-2 border-gray-200',
              'flex justify-center items-center w-8 h-8 rounded-full'
            )}
          >
            {progress === 'input' && !isError && (
              <div className="absolute w-[14px] h-[14px] bg-red-500 rounded-full animate-ping" />
            )}
            <div className={clsx(isError ? 'bg-gray-200' : 'bg-red-600', 'relative w-[14px] h-[14px] rounded-full')} />
          </div>
          <p className={clsx(!isError && 'text-red-600', 'mt-1 text-sm lg:text-base')}>情報入力</p>
        </div>

        <div className="flex flex-col items-center bg-white">
          <div
            className={clsx(
              progress === 'confirm' && !isError && 'border-2 border-gray-200',
              (progress === 'complete' || isSending) && !isError && 'border-2 border-red-500',
              'flex justify-center items-center w-8 h-8 rounded-full'
            )}
          >
            {progress === 'confirm' && !isSending && !isError && (
              <div className="absolute w-[14px] h-[14px] bg-red-500 rounded-full animate-ping" />
            )}
            <div
              className={clsx(
                progress !== 'input' && !isError ? 'bg-red-600' : 'bg-gray-200',
                'w-[14px] h-[14px] rounded-full'
              )}
            />
          </div>
          <p className={clsx(progress !== 'input' && !isError && 'text-red-600', 'mt-1 text-sm lg:text-base')}>
            内容確認
          </p>
        </div>

        <div className="flex flex-col items-center bg-white">
          <div
            className={clsx(
              progress === 'complete' && !isError && 'border-2 border-red-500',
              'flex justify-center items-center w-8 h-8 rounded-full'
            )}
          >
            <div
              className={clsx(
                progress === 'complete' && !isError ? 'bg-red-600' : 'bg-gray-200',
                'w-[14px] h-[14px] rounded-full'
              )}
            />
          </div>
          <p className={clsx(progress === 'complete' && !isError && 'text-red-600', 'mt-1 text-sm lg:text-base')}>
            送信完了
          </p>
        </div>
      </div>
    </div>
  )
}

export default Progress
