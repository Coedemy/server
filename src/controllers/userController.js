const { ObjectId } = require('mongodb')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { User } = require('../schemas')
const { uploadFileToS3, getFileStreamFromS3 } = require('../helpers/upload')

const getAllUsers = async (req, res) => {
  const users = await User.find()
  res.json({
    total: users.length,
    users
  })
}

const getUser = async (req, res) => {
  const userId = req.params.id
  const user = await User.find({ _id: userId })
  res.json({
    user: user?.[0]
  })
}

const searchUserByUsername = async (req, res) => {
  const { username } = req.query

  if (username.length < 3) return res.sendStatus(200)
  const users = await User.find({ username: new RegExp(username, 'i') })
  res.status(200).json(users)
}

const getCoverPicture = async (req, res, next) => {
  const key = req.params.key
  try {
    const readStream = getFileStreamFromS3(key)
    readStream.pipe(res)
  } catch (err) {
    next(err)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { avatar, coverPicture } = req.files
    const user = { ...req.body }

    if (avatar && avatar !== '') user['avatar'] = avatar[0].path
    if (coverPicture && coverPicture !== '')
      user['coverPicture'] = coverPicture[0].path

    const updatedUser = await User.findOneAndUpdate(
      { _id: ObjectId(userId) },
      user,
      { new: true }
    )

    res.status(200).json(updatedUser)
  } catch (err) {
    console.log(err)
    next(err)
  }
  // const result = await uploadFileToS3(file)
  // await unlinkFile(file.path)
  // console.log(result)
  // const description = req.body.description
  // res.status(200).json({imagePath: `/images/${result.Key}`})
}

const toggleFavorite = async (req, res, next) => {
  const user = req.user
  const { courseId } = req.body
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: ObjectId(user.id) },
      { $push: { wishlist: courseId } },
      { new: true })
      .populate({
        path: 'wishlist',
        populate: {
          path: 'category',
        }
      }).exec()
    res.json({ wishlist: updatedUser.wishlist })
  }
  catch (err) {
    next(err)
  }
}

const loadCart = async (req, res, next) => {
  const user = req.user
  const { cart } = req.body

  try {
    const courseIdList = cart.map(course => course._id)
    const updatedUser = await User.findOneAndUpdate(
      { _id: ObjectId(user.id) },
      { $push: { cart: { $each: [...courseIdList] } } },
      { new: true })
      .populate({
        path: 'cart',
        populate: {
          path: 'category',
        }
      })
      .exec()
    res.json({ cart: updatedUser.cart })
  }
  catch (err) {
    next(err)
  }
}

const updateCart = async (req, res, next) => {
  const user = req.user
  const { updateType, courseId } = req.body

  try {
    let updateQuery
    if (updateType === 'add') {
      updateQuery = { $push: { cart: courseId } }
    }
    else if (updateType === 'remove') {
      updateQuery = { $pull: { cart: courseId } }
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: ObjectId(user.id) },
      updateQuery,
      { new: true })
      .populate({
        path: 'cart',
        populate: {
          path: 'category',
        }
      }).exec()
    res.json({ cart: updatedUser.cart })
  }
  catch (err) {
    next(err)
  }
}

// wishlist, myLearning
const loadAuthUserProperties = async (req, res, next) => {
  const user = req.user

  try {
    const foundUser = await User.findById(user.id)
      .populate({ path: 'wishlist', populate: { path: 'category' } })
      .populate({ path: 'myLearning', populate: { path: 'category' } })

    res.json({ wishlist: foundUser.wishlist, myLearning: foundUser.myLearning })
  }
  catch (err) {
    next(err)
  }
}

const loadMyTeaching = async (req, res, next) => {
  const user = req.user

  try {
    const { myTeaching } = await User.findById(user.id)
      .populate({ path: 'myTeaching', populate: { path: 'category' } })
      .select('myTeaching')

    res.json({ myTeaching })
  }
  catch (err) {
    next(err)
  }
}

module.exports = {
  getAllUsers,
  getUser,
  searchUserByUsername,
  updateUser,
  getCoverPicture,
  loadAuthUserProperties,
  loadCart,
  updateCart,
  toggleFavorite,
  loadMyTeaching
}
