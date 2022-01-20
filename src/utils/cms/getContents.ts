import { MicroCMSQueries } from 'microcms-js-sdk'

import { Form } from '~/src/types/form'
import { apiClient } from '~/src/utils/cms/apiClient'

export const getForm = (queries?: MicroCMSQueries) => apiClient.getObject<{ form: Form }>({ endpoint: 'form', queries })
