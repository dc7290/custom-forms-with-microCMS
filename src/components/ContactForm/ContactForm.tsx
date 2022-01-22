import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducer } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import useWarningOnExit from '~/src/hooks/warn/useWarningOnExit'
import { Form } from '~/src/types/form'

import { LoadingSpinner } from '../LoadingSpinner'
import { Progress } from '../Progress'

import { ConfirmList } from './ConfirmList'
import { FormList } from './FormList'
import { createFormList, createFormListItemTitleMap } from './presenter'

type Props = {
  list: Form
  className?: string
}

export type FormValues = Record<string, string | boolean | string[]>

type State = {
  progress: 'input' | 'confirm' | 'complete'
  data: [string, string, boolean][]
  isSending: boolean
  isError: boolean
}
export type { State as FormState }

type Action =
  | {
      type: 'CONFIRM'
      payload: State['data']
    }
  | {
      type: 'SENDING' | 'BACK_TO_INPUT' | 'COMPLETE' | 'ADD_ERROR'
    }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CONFIRM': {
      return {
        ...state,
        progress: 'confirm',
        data: action.payload,
      }
    }
    case 'BACK_TO_INPUT': {
      return {
        ...state,
        progress: 'input',
      }
    }
    case 'SENDING': {
      return {
        ...state,
        isSending: true,
      }
    }
    case 'COMPLETE': {
      return {
        ...state,
        progress: 'complete',
        isSending: false,
      }
    }
    case 'ADD_ERROR': {
      return {
        ...state,
        isError: true,
      }
    }
  }
}

const ContactForm = ({ list, className }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    progress: 'input',
    data: [],
    isSending: false,
    isError: false,
  })

  const formList = createFormList(list)
  const formListItemTitleMap = createFormListItemTitleMap(formList)

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm<FormValues>({
    delayError: 500,
    defaultValues: Object.assign(
      {},
      ...formList.filter(({ fieldId }) => fieldId === 'radioGroup').map(({ id }) => ({ [id]: `${id}-1` }))
    ),
  })

  const handleFormScroll = () => {
    window.scrollTo({
      top: document.getElementById('form')?.offsetTop,
      behavior: 'smooth',
    })
  }
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const confirmData: State['data'] = []

    for (let i = 0; i < formList.length; i++) {
      const item = formList[i]

      if (item === undefined) throw Error('ConfirmDataの作成中にエラーが起きました。')

      if (item.fieldId === 'postalCodeAndAddress') {
        confirmData.push(
          [item.title, data['postalCode'] as string, item.isRequired ?? false],
          [item.addressTitle, data['address'] as string, item.isRequired ?? false]
        )
        continue
      }

      let value = ''

      if (item.fieldId === 'checkbox') {
        value = data[item.id] ? 'チェック' : ''
      } else if (item.fieldId === 'checkboxGroup') {
        value =
          data[item.id] === false
            ? ''
            : (data[item.id] as string[]).map((value) => formListItemTitleMap.get(value) ?? '').join(', ')
      } else if (item.fieldId === 'radioGroup') {
        value = formListItemTitleMap.get(data[item.id] as string) ?? ''
      } else if (item.fieldId === 'textField' || item.fieldId === 'textArea') {
        value = data[item.id] as string
      } else {
        value = data[item.fieldId] as string
      }

      confirmData.push([item.title, value, item.isRequired ?? false])
    }

    handleFormScroll()
    dispatch({ type: 'CONFIRM', payload: confirmData })
  }
  const handleBack = () => {
    handleFormScroll()
    dispatch({ type: 'BACK_TO_INPUT' })
  }
  const handleSend = () => {
    handleFormScroll()
    dispatch({ type: 'SENDING' })

    // 実際にはAPI Routesを使ってメールを送信する
    // fetch('/api/mail', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ data: state.data }),
    // })
    //   .then(() => {
    //     dispatch({ type: 'COMPLETE' })
    //   })
    //   .catch(() => {
    //     dispatch({ type: 'ADD_ERROR' })
    //   })
    setTimeout(() => {
      window.alert(`以下のデータで送信される想定です。
${JSON.stringify({ data: state.data })}`)
      dispatch({ type: 'COMPLETE' })
    }, 2000)
  }

  const shouldWarn = isDirty && state.progress !== 'complete'
  useWarningOnExit(shouldWarn)

  return (
    <div id="form" className={clsx(className, 'relative')}>
      <Progress {...state} />
      {!state.isError ? (
        <>
          <div className="mt-10 p-6 bg-gray-100 rounded md:p-8">
            <AnimatePresence exitBeforeEnter>
              {state.progress === 'input' ? (
                <motion.form
                  key="input"
                  onSubmit={handleSubmit(onSubmit)}
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FormList list={formList} {...{ register, errors, setValue, watch }} />
                  <button type="submit" className="hidden" aria-hidden="true" />
                </motion.form>
              ) : state.progress === 'confirm' ? (
                <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="">入力内容を確認後、お間違いがなければ送信してください。</p>
                  <ConfirmList list={state.data} className="mt-10" />
                </motion.div>
              ) : (
                <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="">お問い合わせいただきありがとうございました。</p>
                </motion.div>
              )}
              {state.isSending && (
                <motion.div key="loading" className="fixed inset-0 flex justify-center items-center bg-white/80">
                  <LoadingSpinner className="w-8 h-8 text-gray-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={state.progress}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center space-x-8 mt-10"
            >
              {state.progress === 'input' && (
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="w-56 h-14 font-bold text-white rounded-lg bg-black shadow"
                >
                  入力内容を確認する
                </button>
              )}
              {state.progress === 'confirm' && (
                <>
                  <button onClick={handleBack} className="w-56 h-14 font-bold rounded-lg bg-gray-300 shadow">
                    戻る
                  </button>
                  <button onClick={handleSend} className="w-56 h-14 font-bold text-white rounded-lg bg-black shadow">
                    送信する
                  </button>
                </>
              )}
              {state.progress === 'complete' && (
                <a
                  href=""
                  className="flex justify-center items-center w-56 h-14 font-bold rounded-lg bg-gray-300 shadow"
                >
                  TOPへ戻る
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <div key="error" className="flex justify-center items-center mt-20 text-red-400">
          <p>
            エラーが発生しました。お手数ですがもういちど最初からご入力ください。
            <br />
            それでもエラーが続くようでしたら、
            <a className="underline" href="mailto:">
              こちらのメールアドレス
            </a>
            に不具合報告をしていただると幸いです。
          </p>
        </div>
      )}
    </div>
  )
}

export default ContactForm
