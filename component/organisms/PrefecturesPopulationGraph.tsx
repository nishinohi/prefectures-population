import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import usePrefectures from '../../libs/usePrefectures'
import { GraphData } from '../../pages'
import { Prefecture } from '../../pages/api/prefectures'

type PrefecturesPopulationGraphProps = {
  readonly graphDatas: GraphData[]
  readonly showPrefectureMap: Map<number, boolean>
}

const PrefecturesPopulationGraph = ({ graphDatas, showPrefectureMap }: PrefecturesPopulationGraphProps) => {
  const { prefectures } = usePrefectures()

  if (!prefectures) return <></>

  const showPrefectures: Prefecture[] = Array.from(showPrefectureMap)
    .filter((showPrefecture) => showPrefecture[1])
    .map((showPrefecture) => {
      const prefName = prefectures.get(showPrefecture[0])
      return {
        prefCode: showPrefecture[0],
        prefName: prefName ? prefName : '',
      }
    })

  if (showPrefectures.length === 0) return <></>

  return (
    <div style={{ height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={200}
          data={graphDatas}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          {showPrefectures.map((showPrefecture) => (
            <Line key={showPrefecture.prefCode} dataKey={showPrefecture.prefName} stroke="#8884d8" />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PrefecturesPopulationGraph
