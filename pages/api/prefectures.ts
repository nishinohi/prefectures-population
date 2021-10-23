// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type PrefectureResponse = {
  message: string | null
  result: Prefecture[]
}

export type Prefecture = {
  prefCode: number
  prefName: string
}

// export default function handler(req: NextApiRequest, res: NextApiResponse<Prefecture[]>) {
export default async function handler(req: NextApiRequest, res: NextApiResponse<Prefecture[]>) {
  const apiKey = process.env.RESAS_API_KEY
  if (apiKey === undefined) {
    res.status(500)
    return
  }

  const resusRes = await fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
    method: 'GET',
    headers: {
      'X-API-KEY': apiKey,
    },
  })

  if (!resusRes.ok) {
    res.status(resusRes.status)
    return
  }

  const data: PrefectureResponse = await resusRes.json()
  res.status(200).json(data.result)
}
