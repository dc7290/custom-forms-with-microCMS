import clsx from 'clsx'

import { FormState } from '../ContactForm'

type Props = {
  list: FormState['data']
  className?: string
}

const ConfirmList = ({ list, className }: Props) => {
  return (
    <ul className={clsx(className, 'space-y-6')}>
      {list.map(([key, value, isRequired]) => (
        <li key={key}>
          <div className="flex items-center">
            <div className="font-bold text-lg">{key}</div>
            {isRequired && <div className="ml-3 px-2 py-0.5 text-white bg-red-400">必須</div>}
          </div>
          {value.includes('\n') ? (
            <div className="min-h-[160px] mt-2 p-2 rounded border border-black">
              {value.split('\n').map((text) => (
                <div key={text.slice(0, 10)}>
                  {text}
                  <br />
                </div>
              ))}
            </div>
          ) : (
            <div className="min-h-[42px] mt-2 p-2 rounded border border-black">{value}</div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default ConfirmList
