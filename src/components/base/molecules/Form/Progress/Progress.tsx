import clsx from 'clsx'

import { FormState } from '../Form'

type Props = {
  className?: string
} & Omit<FormState, 'data'>

const Progress = ({ progress, isSending, isError, className }: Props) => {
  return (
    <div className={clsx(className, 'relative')}>
      <div className="absolute inset-x-0 top-4 h-px w-full bg-gray-200" />
      <div className="relative flex justify-between">
        <div className="flex flex-col items-center bg-white">
          <div
            className={clsx(
              progress !== 'input' && !isError && 'border-2 border-red-500',
              progress === 'input' && !isError && 'border-2 border-gray-200',
              'flex h-8 w-8 items-center justify-center rounded-full'
            )}
          >
            {progress === 'input' && !isError && (
              <div className="absolute h-[14px] w-[14px] animate-ping rounded-full bg-red-500" />
            )}
            <div className={clsx(isError ? 'bg-gray-200' : 'bg-red-600', 'relative h-[14px] w-[14px] rounded-full')} />
          </div>
          <p className={clsx(!isError && 'text-red-600', 'mt-1 text-sm lg:text-base')}>情報入力</p>
        </div>

        <div className="flex flex-col items-center bg-white">
          <div
            className={clsx(
              progress === 'confirm' && !isError && 'border-2 border-gray-200',
              (progress === 'complete' || isSending) && !isError && 'border-2 border-red-500',
              'flex h-8 w-8 items-center justify-center rounded-full'
            )}
          >
            {progress === 'confirm' && !isSending && !isError && (
              <div className="absolute h-[14px] w-[14px] animate-ping rounded-full bg-red-500" />
            )}
            <div
              className={clsx(
                progress !== 'input' && !isError ? 'bg-red-600' : 'bg-gray-200',
                'h-[14px] w-[14px] rounded-full'
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
              'flex h-8 w-8 items-center justify-center rounded-full'
            )}
          >
            <div
              className={clsx(
                progress === 'complete' && !isError ? 'bg-red-600' : 'bg-gray-200',
                'h-[14px] w-[14px] rounded-full'
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
