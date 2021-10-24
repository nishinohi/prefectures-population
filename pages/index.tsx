import type { NextPage } from 'next'
import Layout from '../component/template/Layout'
import PrefecturesPopulation from '../component/template/PrefecturesPopulation'

export type GraphData = Record<string, number | undefined>

const Home: NextPage = () => {
  return (
    <Layout title={'都道府県別人口構成'}>
      <PrefecturesPopulation />
    </Layout>
  )
}

export default Home
