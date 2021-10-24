// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type PopulationResponse = {
  message: string | null
  result: {
    boundaryYear: number
    data: {
      label: string
      data: Population[]
    }[]
  }
}

export type Population = {
  year: number
  value: number
  rate?: number
}

// export default function handler(req: NextApiRequest, res: NextApiResponse<PopulationComposition[]>) {
export default async function handler(req: NextApiRequest, res: NextApiResponse<Population[]>) {
  const apiKey = process.env.RESAS_API_KEY
  if (apiKey === undefined) {
    res.status(500)
    return
  }

  const { prefectureCode } = req.query
  const poplationRes = await fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${
      prefectureCode as string
    }`,
    {
      method: 'GET',
      headers: {
        'X-API-KEY': apiKey,
      },
    }
  )
  if (!poplationRes.ok) {
    res.status(poplationRes.status)
    return
  }

  const data: PopulationResponse = await poplationRes.json()
  const population = data.result.data.filter((data) => data.label === '総人口')
  if (population.length !== 1) {
    res.status(500)
    return
  }

  res.status(200).json(population[0].data)
}
