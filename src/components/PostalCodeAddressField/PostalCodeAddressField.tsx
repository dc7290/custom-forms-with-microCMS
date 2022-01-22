import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { MouseEvent, useRef, useReducer } from 'react'
import { ChangeHandler, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import mergedRef from '~/src/utils/mergedRef'

import { FormValues } from '../ContactForm/ContactForm'
import { ErrorMessageProps } from '../ErrorMessage'
import { LoadingSpinner } from '../LoadingSpinner'
import { TextField } from '../TextField'

type Props = {
  register: UseFormRegister<FormValues>
  setValue: UseFormSetValue<FormValues>
  postalCode: {
    title: string
    placeholder?: string
    description?: string
  }
  address: {
    title: string
    placeholder?: string
    description?: string
  }
  isRequired?: boolean
  isAutoFill?: boolean
  className?: string
  errors: ErrorMessageProps['errors']
}

type State = {
  isLoading: boolean
  error: string | null
}

type Action = { type: 'SEARCH' } | { type: 'COMPLETE'; payload?: string }

const reducer = (_: State, action: Action): State => {
  switch (action.type) {
    case 'SEARCH': {
      return { isLoading: true, error: null }
    }
    case 'COMPLETE': {
      return { isLoading: false, error: action.payload ?? null }
    }
  }
}

const PostalCodeAddressField = ({
  register,
  setValue,
  postalCode,
  address,
  isRequired,
  isAutoFill,
  errors,
  className,
}: Props) => {
  const postalCodeFieldProps = register('postalCode', {
    required: isRequired ? `[${postalCode.title}」は必ず入力してください。` : false,
    pattern: {
      value: /^[０-９0-9\-ー]+$/,
      message: '数字と「-」で入力してください。',
    },
    setValueAs: (v) =>
      v.replace(/[-ー]/g, '').replace(/[０-９]/g, (v: string) => String.fromCharCode(v.charCodeAt(0) - 0xfee0)),
  })
  const addressFieldProps = register('address', {
    required: isRequired ? `[${address.title}」は必ず入力してください。` : false,
  })

  const internalPostalCodeRef = useRef<HTMLInputElement>(null)
  const postalCodeRef = mergedRef<HTMLInputElement>(postalCodeFieldProps.ref, internalPostalCodeRef)

  const [state, dispatch] = useReducer(reducer, { isLoading: false, error: null })

  const search = async () => {
    const zipcode = internalPostalCodeRef.current?.value
    if (zipcode !== undefined) {
      if (zipcode === '') {
        dispatch({ type: 'COMPLETE', payload: '検索するためには郵便番号を入力してください。' })
        return
      }

      dispatch({ type: 'SEARCH' })
      const address = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`).then((res) =>
        res.json()
      )
      if (address.status === 200) {
        if (address.results !== null) {
          if (address.results.length === 1) {
            setValue('address', address.results[0].address1 + address.results[0].address2 + address.results[0].address3)
          } else {
            setValue('address', address.results[0].address1 + address.results[0].address2)
          }
          dispatch({ type: 'COMPLETE' })
        } else {
          dispatch({
            type: 'COMPLETE',
            payload: '住所の検索ができませんでした。<br />郵便番号が正しいかご確認ください。',
          })
        }
      } else if (address.status === 400) {
        dispatch({
          type: 'COMPLETE',
          payload: '住所の検索ができませんでした。<br />郵便番号が正しいかご確認ください。',
        })
      } else if (address.status === 500) {
        dispatch({
          type: 'COMPLETE',
          payload: '現在住所検索のサーバーが機能しておりません。<br />お手数ですが、住所を手動で入力してください。',
        })
      }
    }
  }
  const handlePostalCodeChange: ChangeHandler = async (e) => {
    postalCodeFieldProps.onChange(e)

    const { value } = e.target
    const isIncludes = /[-ー]/.test(value)
    if ((isIncludes && value.length === 8) || (!isIncludes && value.length === 7)) {
      if (!state.isLoading) search()
    }
  }
  const handleAddressSearch = (e?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e?.preventDefault()
    search()
  }

  return (
    <div className={clsx(className, 'space-y-6')}>
      <div className="md:flex md:items-start md:space-x-10">
        <TextField
          className="w-40 md:w-1/3"
          label={postalCode.title}
          errors={errors}
          id="postalCode"
          isRequired={isRequired}
          placeholder={postalCode.placeholder}
          description={postalCode.description}
          autoComplete="postalCode"
          {...postalCodeFieldProps}
          ref={postalCodeRef}
          onChange={isAutoFill ? handlePostalCodeChange : postalCodeFieldProps.onChange}
        />
        {isAutoFill && (
          <div className="relative max-w-[200px] h-10 mt-4 md:flex-1 md:mt-9">
            <button
              type="button"
              disabled={state.isLoading}
              className={clsx(
                state.isLoading ? 'bg-gray-300' : 'bg-black',
                'relative w-full h-full font-bold text-white bg-black rounded-lg shadow transition-colors'
              )}
              onClick={handleAddressSearch}
            >
              住所を検索する
              <AnimatePresence>
                {state.isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex justify-center items-center text-slate-800 rounded-lg"
                  >
                    <LoadingSpinner className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <AnimatePresence>
              {state.error !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute -bottom-3 left-0 z-10 inline-block min-w-[200px] p-2 text-xs text-red-700 bg-white rounded-md shadow-[0_0_8px_rgba(0,0,0,0.16)] translate-y-full"
                  role="alert"
                >
                  <p dangerouslySetInnerHTML={{ __html: state.error }} />
                  <div
                    className="absolute -top-6 left-3 w-4 h-7 bg-white [clip-path:polygon(0_50%,0_100%,100%_100%)]"
                    aria-hidden="true"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      <TextField
        label={address.title}
        errors={errors}
        id="address"
        isRequired={isRequired}
        placeholder={address.placeholder}
        description={address.description}
        autoComplete="address"
        {...addressFieldProps}
      />
    </div>
  )
}

export default PostalCodeAddressField
