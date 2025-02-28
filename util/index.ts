// 重複を削除
export const removeDuplicateValues = ([...array]) => {
  return array.filter((value, index, self) => self.indexOf(value) === index)
}
// スリープ
export const sleep = (ms: number): Promise<true> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), ms)
  })
}
// JSONかどうか
export const isJson = (data: string) => {
  try {
    JSON.parse(data)
  } catch (error) {
    return false
  }
  return true
}
