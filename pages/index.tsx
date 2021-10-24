import type { NextPage } from 'next'
import Head from 'next/head'
import { ChangeEvent, useState } from 'react'
import PrefecturesCheckbox from '../component/organisms/PrefecturesCheckbox'
import usePrefectures from '../libs/usePrefectures'
import styles from '../styles/PrefecturesPopulation.module.css'

const PrefecturesPopulation: NextPage = () => {
  const { prefectures } = usePrefectures()
  const [showPrefectures, setShowPrefectures] = useState<Map<number, boolean>>(new Map())

  const handleShowPrefecture = (event: ChangeEvent<HTMLInputElement>, prefectureCode: number) => {
    if (!prefectures) return
    // 表示都道府県をセット
    const newShowPrefectures = new Map(showPrefectures)
    if (newShowPrefectures.size === 0) {
      prefectures.forEach((_preName, prefectureCode) => newShowPrefectures.set(prefectureCode, false))
    }
    newShowPrefectures.set(prefectureCode, event.target.checked)
    setShowPrefectures(newShowPrefectures)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>都道府県別人口構成</title>
        <meta name="description" content="prefectures population" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>都道府県別人口構成</h1>
        <p className={styles.textBase}>
          ※ 短時間に大量のグラフを表示しようとする(5回以上/1sec)と情報の取得が制限されるためご注意下さい
        </p>
        {prefectures && <PrefecturesCheckbox handleShowPrefecture={handleShowPrefecture} />}
      </main>
    </div>
  )
}

export default PrefecturesPopulation
