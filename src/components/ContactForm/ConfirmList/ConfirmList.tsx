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
            <div className="text-lg font-bold">{key}</div>
            {isRequired && <div className="py-0.5 px-2 ml-3 text-white bg-red-600">必須</div>}
          </div>
          {value.includes('\n') ? (
            <div className="p-2 mt-2 min-h-[160px] rounded border border-black">
              {value.split('\n').map((text) => (
                <div key={text.slice(0, 10)}>
                  {text}
                  <br />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-2 mt-2 min-h-[42px] rounded border border-black">{value}</div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default ConfirmList
