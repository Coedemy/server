const _ = require('lodash')

const groupObjectByKey = (objList, key) => {
  console.log(key)
  return _.groupBy(objList, key)
}

module.exports = {
  groupObjectByKey
}