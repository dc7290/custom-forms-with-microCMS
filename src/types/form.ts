type CommonField = {
  title: string
  placeholder?: string
  isRequired?: boolean
  description?: string
}

type Item = {
  fieldId: 'listItem'
  text: string
}

type Name = CommonField & {
  fieldId: 'name'
}

type Email = CommonField & {
  fieldId: 'email'
  isConfirm: boolean
}

type Organization = CommonField & {
  fieldId: 'organization'
}

type Address = CommonField & {
  fieldId: 'address'
}

type PostalCodeAndAddress = CommonField & {
  fieldId: 'postalCodeAndAddress'
  addressTitle: string
  addressPlaceholder?: string
  addressDescription?: string
  isAutoFill: boolean
}

type Tel = CommonField & {
  fieldId: 'tel'
}

type TextField = CommonField & {
  fieldId: 'textField'
}

type TextArea = CommonField & {
  fieldId: 'textArea'
}

type Checkbox = CommonField & {
  fieldId: 'checkbox'
}

type CheckboxGroup = CommonField & {
  fieldId: 'checkboxGroup'
  items: Item[]
}

type RadioGroup = CommonField & {
  fieldId: 'radioGroup'
  items: Item[]
}

export type Form = (
  | Name
  | Email
  | Tel
  | Organization
  | PostalCodeAndAddress
  | Address
  | TextField
  | TextArea
  | Checkbox
  | CheckboxGroup
  | RadioGroup
)[]
