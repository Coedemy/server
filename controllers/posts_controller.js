const getPosts = (req, res) => {
  res.status(200).json("posts")
}

module.exports = {
  getPosts,
}
