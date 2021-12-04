const { ObjectId } = require('mongodb')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { User } = require('../schemas')
const { uploadFileToS3, getFileStreamFromS3 } = require('../services/upload')

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

const getUserProperties = async (req, res, next) => {
  const userId = req.user.id

  const user = await User.findById(userId)

  res.json({
    userProperties: user
  })
}

const initializeUserProperties = async (req, res, next) => {
  const user = req.user
  const { cart } = req.body
  const courseIdList = cart.map(course => course._id)

  try {
    const initializedProperties = await User.findOneAndUpdate(
      { _id: ObjectId(user.id) },
      { $push: { cart: { $each: [...courseIdList] } } },
      { new: true })
      .populate('cart').exec()
    console.log({ total: initializedProperties.cart.length })
    res.json({ cart: initializedProperties.cart })
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
  getUserProperties,
  initializeUserProperties
}
