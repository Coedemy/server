const pickRandomElementsFromArray = (array, numberOfElement) => {
  // Shuffle array
  const shuffled = array.sort(() => 0.5 - Math.random())
  // Get sub-array of first n elements after shuffled
  const selectedElement = shuffled.slice(0, numberOfElement)
  return selectedElement
}

const findDuplicateItems = array => array.filter((item, index) => array.indexOf(item) !== index)

const swapTwoElementsInArray = (arr, pos1, pos2) => {
  const resultArr = [...arr]
  const temp = resultArr[pos1]
  resultArr[pos1] = resultArr[pos2]
  resultArr[pos2] = temp
  return resultArr
}

module.exports = {
  pickRandomElementsFromArray,
  findDuplicateItems,
  swapTwoElementsInArray
}