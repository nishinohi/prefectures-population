import { NextApiRequest, NextApiResponse } from 'next'
import httpMocks from 'node-mocks-http'
import populationHandler, { Population } from '../pages/api/population/[prefectureCode]'
import { default as prefecturesHnadler, Prefecture } from '../pages/api/prefectures'

describe('/api/prefectures', () => {
  it('return prefectures', async () => {
    const mockReq = httpMocks.createRequest<NextApiRequest>({
      method: 'GET',
    }) as NextApiRequest
    const mockRes = httpMocks.createResponse<NextApiResponse>() as NextApiResponse<Prefecture[]>

    await prefecturesHnadler(mockReq, mockRes)
    expect(mockRes.statusCode).toEqual(200)
  })
})

describe('/api/population/[prefectureCode]', () => {
  it('return prefecture population', async () => {
    const mockReq = httpMocks.createRequest<NextApiRequest>({
      query: { prefectureCode: 1 },
    }) as NextApiRequest
    const mockRes = httpMocks.createResponse<NextApiResponse>() as NextApiResponse<Population[]>

    await populationHandler(mockReq, mockRes)
    expect(mockRes.statusCode).toEqual(200)
  })
})
