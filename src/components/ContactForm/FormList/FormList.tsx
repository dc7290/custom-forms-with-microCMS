import clsx from 'clsx'
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'

import { Checkbox } from '~/src/components/Checkbox'
import { CheckboxGroup } from '~/src/components/CheckboxGroup'
import { ErrorMessageProps } from '~/src/components/ErrorMessage'
import { PostalCodeAddressField } from '~/src/components/PostalCodeAddressField'
import { RadioGroup } from '~/src/components/RadioGroup'
import { TextArea } from '~/src/components/TextArea'
import { TextField } from '~/src/components/TextField'

import { FormValues } from '../ContactForm'
import { FormList } from '../presenter'

type Props = {
  list: FormList
  register: UseFormRegister<FormValues>
  errors: ErrorMessageProps['errors']
  setValue: UseFormSetValue<FormValues>
  watch: UseFormWatch<FormValues>
  className?: string
}

const FormList = ({ list, register, errors, setValue, watch, className }: Props) => {
  return (
    <div className={clsx(className, 'space-y-6')}>
      {list.map((item) => {
        switch (item.fieldId) {
          case 'name': {
            return (
              <TextField
                key="name"
                label={item.title}
                errors={errors}
                id="name"
                isRequired={item.isRequired}
                placeholder={item.placeholder}
                description={item.description}
                autoComplete="name"
                {...register('name', {
                  required: item.isRequired ? `[${item.title}」は必ず入力してください。` : false,
                })}
              />
            )
          }
          case 'email': {
            return (
              <TextField
                key="email"
                label={item.title}
                errors={errors}
                id="email"
                type="email"
                isRequired={item.isRequired}
                placeholder={item.placeholder}
                description={item.description}
                autoComplete="email"
                {...register('email', {
                  required: item.isRequired ? `[${item.title}」は必ず入力してください。` : false,
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'メールアドレスの形式で入力してください。',
                  },
                })}
              />
            )
          }
          case 'tel': {
            return (
              <TextField
                key="tel"
                label={item.title}
                errors={errors}
                id="tel"
                type="tel"
                isRequired={item.isRequired}
                placeholder={item.placeholder}
                description={item.description}
                autoComplete="tel"
                {...register('tel', {
                  required: item.isRequired ? `[${item.title}」は必ず入力してください。` : false,
                  pattern: {
                    value: /^[０-９0-9\-ー]+$/,
                    message: '数字と「-」で入力してください。',
                  },
                  setValueAs: (v) =>
                    v
                      .replace(/[-ー]/g, '')
                      .replace(/[０-９]/g, (v: string) => String.fromCharCode(v.charCodeAt(0) - 0xfee0)),
                })}
              />
            )
          }
          case 'organization': {
            return (
              <TextField
                key="organization"
                label={item.title}
                errors={errors}
                id="organization"
                isRequired={item.isRequired}
                placeholder={item.placeholder}
                description={item.description}
                autoComplete="organization"
                {...register('organization', {
                  required: item.isRequired ? `[${item.title}」は必ず入力してください。` : false,
                })}
              />
            )
          }
          case 'postalCodeAndAddress': {
            return (
              <PostalCodeAddressField
                key="postalCodeAndAddress"
                postalCode={{ ...item }}
                isRequired={item.isRequired}
                isAutoFill={item.isAutoFill}
                address={{
                  title: item.addressTitle,
                  placeholder: item.addressPlaceholder,
                  description: item.addressDescription,
                }}
                {...{ register, setValue, errors }}
              />
            )
          }
          case 'address': {
            return (
              <TextField
                key="address"
                label={item.title}
                errors={errors}
                id="address"
                isRequired={item.isRequired}
                placeholder={item.placeholder}
                description={item.description}
                autoComplete="address-line1"
                {...register('address', {
                  required: item.isRequired ? `[${item.title}」は必ず入力してください。` : false,
                  setValueAs: (v) =>
                    v
                      .replace(/ー/g, '-')
                      .replace(/[０-９]/g, (v: string) => String.fromCharCode(v.charCodeAt(0) - 0xfee0)),
                })}
              />
            )
          }
          case 'textField': {
            return (
              <TextField
                key={item.id}
                label={item.title}
                errors={errors}
                id={item.id}
                isRequired={item.isRequired}
                placeholder={item.placeholder}
                description={item.description}
                {...register(item.id, {
                  required: item.isRequired ? `[${item.title}」は必ず入力してください。` : false,
                })}
              />
            )
          }
          case 'textArea': {
            return (
              <TextArea
                key={item.id}
                label={item.title}
                errors={errors}
                id={item.id}
                isRequired={item.isRequired}
                placeholder={item.placeholder}
                description={item.description}
                {...register(item.id, {
                  required: item.isRequired ? `[${item.title}」は必ず入力してください。` : false,
                })}
              />
            )
          }
          case 'checkbox': {
            return (
              <Checkbox
                key={item.id}
                errors={errors}
                id={item.id}
                isRequired={item.isRequired}
                description={item.description}
                {...register(item.id, {
                  required: item.isRequired ? `[${item.title}]をチェックしてください。` : false,
                })}
              >
                {item.title}
              </Checkbox>
            )
          }
          case 'checkboxGroup': {
            return (
              <CheckboxGroup
                key={item.id}
                name={item.id}
                label={item.title}
                isRequired={item.isRequired}
                description={item.description}
                errors={errors}
              >
                {item.items.map(({ text, id }) => {
                  return (
                    <CheckboxGroup.Child
                      key={text}
                      id={id}
                      value={id}
                      {...register(item.id, {
                        required: item.isRequired ? `[${item.title}]の項目を最低1つチェックしてください。` : false,
                      })}
                    >
                      {text}
                    </CheckboxGroup.Child>
                  )
                })}
              </CheckboxGroup>
            )
          }
          case 'radioGroup': {
            return (
              <RadioGroup
                key={item.id}
                name={item.id}
                label={item.title}
                description={item.description}
                errors={errors}
              >
                {item.items.map(({ text, id }) => (
                  <RadioGroup.Child
                    key={text}
                    id={id}
                    value={id}
                    currentValue={watch(item.id)?.toString()}
                    {...register(item.id)}
                  >
                    {text}
                  </RadioGroup.Child>
                ))}
              </RadioGroup>
            )
          }
        }
      })}
    </div>
  )
}

export default FormList
