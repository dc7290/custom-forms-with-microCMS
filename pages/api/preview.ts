import { NextApiRequest, NextApiResponse } from 'next'

import { getForm } from '~/src/utils/cms/getContents'

const preview = async (req: NextApiRequest, res: NextApiResponse) => {
  const { draftKey } = req.query
  if (typeof draftKey !== 'string') {
    res.status(404).end()
    return
  }

  try {
    await getForm({ fields: 'form', draftKey })

    res.setPreviewData({ draftKey })
    res.writeHead(307, { Location: `/` })
    res.end('Preview mode enabled')
  } catch (error) {
    return res.status(401).json({ message: error })
  }
}

export default preview
