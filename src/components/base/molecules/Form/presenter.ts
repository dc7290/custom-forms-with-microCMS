import { FormType } from '~/src/types/microCMS/Form'

export const createFormList = (list: FormType) =>
  list.map((item, i) => {
    const id = `field-${i + 1}`

    if (item.fieldId === 'checkboxGroup' || item.fieldId === 'radioGroup') {
      return {
        ...item,
        id,
        items: item.items.map(({ text }, listItemIndex) => ({ text, id: `${id}-${listItemIndex + 1}` })),
      }
    } else {
      return { ...item, id }
    }
  })

export type FormList = ReturnType<typeof createFormList>

export const createFormListItemTitleMap = (formList: FormList) =>
  new Map(
    formList
      .map((item, i): [string, string][] | undefined => {
        const id = `field-${i + 1}`

        if (item.fieldId === 'checkboxGroup' || item.fieldId === 'radioGroup') {
          return item.items.map(({ text }, listItemIndex) => [`${id}-${listItemIndex + 1}`, text])
        } else {
          return undefined
        }
      })
      .flat(1)
      .filter((item): item is Exclude<typeof item, undefined> => item !== undefined)
  )
