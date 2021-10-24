import useSWR from 'swr'
import { Prefecture } from '../pages/api/prefectures'
import { ResponseError } from './ResponseError'

async function fetcher(url: string) {
  const res = await fetch(url)
  const data = await res.json()
  if (!res.ok) {
    if (res.status === 429) {
      throw new ResponseError(429)
    }
  }
  return data as Prefecture[]
}

const usePrefectures = () => {
  const { data, error } = useSWR<Prefecture[]>('/api/prefectures', fetcher)
  const prefectureMap = new Map<number, string>()
  data?.forEach((prefecture) => prefectureMap.set(prefecture.prefCode, prefecture.prefName))
  return { prefectures: data ? prefectureMap : undefined, responseError: error as ResponseError }
}

export default usePrefectures
