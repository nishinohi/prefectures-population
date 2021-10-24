import { ChangeEvent } from 'react'
import usePrefectures from '../../libs/usePrefectures'
import styles from '../../styles/PrefecturesCheckbox.module.css'

type PrefecturesCheckboxProps = {
  handleShowPrefecture: (event: ChangeEvent<HTMLInputElement>, prefectureCode: number) => void
}

const PrefecturesCheckbox = ({ handleShowPrefecture }: PrefecturesCheckboxProps) => {
  const { prefectures } = usePrefectures()

  if (!prefectures) return <></>
  return (
    <div className={styles.checkboxContainer}>
      {Array.from(prefectures.entries()).map((prefecture) => (
        <div className={styles.prefectureWidth} key={prefecture[0]}>
          <input type="checkbox" onChange={(event) => handleShowPrefecture(event, prefecture[0])} />
          <label className={styles.prefectureLabel}>{prefecture[1]}</label>
        </div>
      ))}
    </div>
  )
}

export default PrefecturesCheckbox
