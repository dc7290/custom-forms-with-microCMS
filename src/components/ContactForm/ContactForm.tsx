import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducer } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import DotLoader from 'react-spinners/DotLoader'

import useWarningOnExit from '~/src/hooks/warn/useWarningOnExit'
import { Form } from '~/src/types/form'

import { Progress } from '../Progress'

import { ConfirmList } from './ConfirmList'
import { FormList } from './FormList'
import { createFormList, createFormListItemTitleMap } from './presenter'

type Props = {
  list: Form
  className?: string
}

export type FormValues = Record<string, string | boolean | string[]> & { hasConsented: boolean }

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
    const confirmData: State['data'] = formList.map(({ id, fieldId, isRequired, title }) => {
      let value = ''

      if (fieldId === 'checkbox') {
        value = data[id] ? 'チェック' : ''
      } else if (fieldId === 'checkboxGroup') {
        value =
          data[id] === false
            ? ''
            : (data[id] as string[]).map((value) => formListItemTitleMap.get(value) ?? '').join(', ')
      } else if (fieldId === 'radioGroup') {
        value = formListItemTitleMap.get(data[id] as string) ?? ''
      } else if (fieldId === 'textField' || fieldId === 'textArea') {
        value = data[id] as string
      } else {
        value = data[fieldId] as string
      }

      return [title, value, isRequired ?? false]
    })

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
    }, 1000)
  }

  const shouldWarn = isDirty && state.progress !== 'complete'
  useWarningOnExit(shouldWarn)

  return (
    <div id="form" className={clsx(className, 'relative')}>
      <Progress {...state} />
      {!state.isError ? (
        <>
          <div className="mt-10 p-8 bg-gray-100 rounded">
            <AnimatePresence exitBeforeEnter>
              {state.progress === 'input' ? (
                <motion.form
                  key="input"
                  onSubmit={handleSubmit(onSubmit)}
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FormList list={formList} {...{ register, errors, watch }} />
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
                  <DotLoader color="#000" />
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
                <button onClick={handleSubmit(onSubmit)} className="w-56 h-14 font-bold text-white rounded-lg bg-black">
                  入力内容を確認する
                </button>
              )}
              {state.progress === 'confirm' && (
                <>
                  <button onClick={handleBack} className="w-56 h-14 font-bold rounded-lg bg-gray-300">
                    戻る
                  </button>
                  <button onClick={handleSend} className="w-56 h-14 font-bold text-white rounded-lg bg-black">
                    送信する
                  </button>
                </>
              )}
              {state.progress === 'complete' && (
                <a href="" className="flex justify-center items-center w-56 h-14 font-bold rounded-lg bg-gray-300">
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
