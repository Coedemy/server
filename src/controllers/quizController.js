const createQuiz = async (req, res) => {
  res.json('create quiz')
}

const getQuiz = async (req, res) => {
  res.json('get quiz')
}

module.exports = {
  createQuiz, getQuiz
}