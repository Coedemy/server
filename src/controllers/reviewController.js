const createReview = async (req, res) => {
  res.json('create Review')
}

const getReview = async (req, res) => {
  res.json('get Review')
}

module.exports = {
  createReview, getReview
}