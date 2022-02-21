import { MicroCMSQueries } from 'microcms-js-sdk'

import { FormType } from '~/src/types/microCMS/Form'
import { apiClient } from '~/src/utils/cms/apiClient'

export const getForm = (queries?: MicroCMSQueries) =>
  apiClient.getObject<{ form: FormType }>({ endpoint: 'form', queries })
