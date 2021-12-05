const pickRandomElementsFromArray = (array, numberOfElement) => {
  // Shuffle array
  const shuffled = array.sort(() => 0.5 - Math.random())
  // Get sub-array of first n elements after shuffled
  const selectedElement = shuffled.slice(0, numberOfElement)
  return selectedElement
}

const findDuplicateItems = array => array.filter((item, index) => array.indexOf(item) !== index)

module.exports = {
  pickRandomElementsFromArray,
  findDuplicateItems
}