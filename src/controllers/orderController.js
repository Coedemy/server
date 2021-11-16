const createOrder = async (req, res) => {
  res.json('create order')
}

const getOrder = async (req, res) => {
  res.json('get order')
}

module.exports = {
  createOrder, getOrder
}