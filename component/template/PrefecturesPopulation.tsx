import type { NextPage } from 'next'
import { ChangeEvent, useEffect, useState } from 'react'
import PrefecturesCheckbox from '../../component/organisms/PrefecturesCheckbox'
import PrefecturesPopulationGraph from '../../component/organisms/PrefecturesPopulationGraph'
import { ResponseError } from '../../libs/ResponseError'
import usePrefectures from '../../libs/usePrefectures'
import { generateRandomColorCode } from '../../libs/utils'
import { Population } from '../../pages/api/population/[prefectureCode]'
import styles from '../../styles/PrefecturesPopulation.module.css'

export type GraphData = Record<string, number | undefined>

const PrefecturesPopulation: NextPage = () => {
  const { prefectures, responseError } = usePrefectures()
  const [showPrefectures, setShowPrefectures] = useState<Map<number, boolean>>(new Map())
  const [prefecturesColorCodes, setPrefecturesColorCodes] = useState<Map<number, string>>(new Map())
  const [isTooManyRequest, setIsTooManyRequest] = useState(false)
  const [graphDatas, setGraphDatas] = useState<GraphData[]>([])

  const handleShowPrefecture = (event: ChangeEvent<HTMLInputElement>, prefectureCode: number) => {
    if (!prefectures) return
    const isShow = event.target.checked
    // 表示都道府県をセット
    const newShowPrefectures = new Map(showPrefectures)
    if (newShowPrefectures.size === 0) {
      prefectures.forEach((_preName, prefectureCode) => newShowPrefectures.set(prefectureCode, false))
    }
    newShowPrefectures.set(prefectureCode, isShow)
    setShowPrefectures(newShowPrefectures)

    if (!isShow) return
    // ランダムなカラーコードを生成する
    if (prefecturesColorCodes.size === 0) {
      const prefecturesColorCodes = new Map<number, string>()
      prefectures.forEach((_name, prefectureCode) =>
        prefecturesColorCodes.set(prefectureCode, generateRandomColorCode())
      )
      setPrefecturesColorCodes(prefecturesColorCodes)
    }

    const prefectureName = prefectures.get(prefectureCode)
    if (!prefectureName) return
    // 既に取得済みの場合は何もしない
    if (graphDatas.some((graphData) => graphData[prefectureName] !== undefined)) return

    // 表示対象の人口構成が未取得の場合取得する
    fetchPrefecturePopulation(prefectureCode)
      .then((prefecturePopulation) => {
        // 表示対象の都道府県人口構成データからグラフ用データを生成
        if (graphDatas.length === 0) {
          setGraphDatas(createPrefecturesPopulationForGraph(prefectures, [prefectureCode, prefecturePopulation]))
          return
        }
        // グラフ用データに各都道府県データを追加
        const newGraphDatas = graphDatas.concat()
        prefecturePopulation.forEach((popComData) => {
          const newGraphData = newGraphDatas.find((newGraphData) => newGraphData['year'] === popComData.year)
          if (!newGraphData) return
          newGraphData[prefectureName] = popComData.value
        })
        setGraphDatas(newGraphDatas)
      })
      .catch((e) => {
        if (e instanceof ResponseError) {
          setIsTooManyRequest(e.statusCode === 429)
          return
        }
        throw Error('人口構成データが取得できませんでした')
      })
  }

  /**
   * 都道府県別人口構成取得
   * @param prefectureCode 都道府県コード
   */
  const fetchPrefecturePopulation = async (prefectureCode: number): Promise<Population[]> => {
    const res = await fetch(`/api/population/${prefectureCode}`, { method: 'GET' })
    if (!res.ok) {
      throw new ResponseError(res.status)
    }
    return (await res.json()) as Population[]
  }

  /**
   * Recharts用のデータを生成する
   * 未取得人口データはundefinedで初期化
   * [{year: 1980, 北海道:12032, 青森:undefined, ...}, {year: 1985, ...}]
   * @param prefectures 全都道府県データ
   * @param prefecturePopulation [都道府県コード, 都道府県人口構成]
   */
  const createPrefecturesPopulationForGraph = (
    prefectures: Map<number, string>,
    prefecturePopulation: [number, Population[]]
  ) => {
    const graphDatas: GraphData[] = []
    prefecturePopulation[1].map((population) => {
      const graphData: GraphData = {}
      graphData['year'] = population.year
      prefectures.forEach((prefName, prefCode) => {
        graphData[prefName] = prefCode === prefecturePopulation[0] ? population.value : undefined
      })
      graphDatas.push(graphData)
    })
    return graphDatas
  }

  useEffect(() => {
    setIsTooManyRequest(responseError && responseError.statusCode === 429)
  }, [responseError])

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>都道府県別人口構成</h1>
      <p className={styles.textBase}>
        ※ 短時間に大量のグラフを表示しようとする(5回以上/1sec)と情報の取得が制限されるためご注意下さい
      </p>
      {prefectures && <PrefecturesCheckbox handleShowPrefecture={handleShowPrefecture} />}
      <PrefecturesPopulationGraph
        graphDatas={graphDatas}
        showPrefectureMap={showPrefectures}
        prefecturesColorCodes={prefecturesColorCodes}
      />
      {isTooManyRequest && (
        <div className={styles.tooManyRequest}>
          <p>短時間に多くのグラフを表示しようとしたため情報の取得が制限されました</p>
          <p>しばらく時間をおいてからご利用下さい</p>
        </div>
      )}
    </main>
  )
}

export default PrefecturesPopulation
