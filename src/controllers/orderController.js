const { ObjectId } = require('mongodb')
const { User } = require('../schemas')

//fake checkout
const checkout = async (req, res, next) => {
  const user = req.user
  const { cart } = req.body

  const courseIdList = cart.map(course => course._id)
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: ObjectId(user.id) },
      {
        $push: { myLearning: { $each: [...courseIdList] } },
        $set: { cart: [] }
      },
      { new: true })
      .populate('myLearning').exec()

    res.json({ myLearning: updatedUser.myLearning })
  }
  catch (err) {
    next(err)
  }
}

module.exports = {
  checkout
}