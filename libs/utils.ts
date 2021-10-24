/**
 * ランダムなカラーコードを生成する
 * @returns ex) #8ac62b
 */
export const generateRandomColorCode = () => {
  let randomColorCode = '#'
  for (let i = 0; i < 6; i++) {
    randomColorCode += ((16 * Math.random()) | 0).toString(16)
  }
  return randomColorCode
}
