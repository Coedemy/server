const { ObjectId } = require("mongoose")
const fs = require("fs")
const util = require("util")
const unlinkFile = util.promisify(fs.unlink)

const { User } = require("../schemas")
const { uploadFileToS3, getFileStreamFromS3 } = require("../services/upload")

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
  const users = await User.find({ username: new RegExp(username, "i") })
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

    if (avatar && avatar !== "") user["avatar"] = avatar[0].path
    if (coverPicture && coverPicture !== "")
      user["coverPicture"] = coverPicture[0].path

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

module.exports = {
  getAllUsers,
  getUser,
  searchUserByUsername,
  updateUser,
  getCoverPicture,
}
