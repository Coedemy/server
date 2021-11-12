const jwt = require("jsonwebtoken")
const { ObjectId } = require("mongodb")

const { Chat, Message } = require("../schemas")
const { paginatedResults } = require("../middlewares/pagination")

const getChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user.id } },
    })
      .populate("users")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })

    res.status(200).json(chats)
  } catch (err) {
    err.statusCode = 400
    next(err)
  }
}

const getChat = async (req, res, next) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      users: { $elemMatch: { $eq: req.user.id } },
    }).populate("users")
    res.status(200).json(chat)
  } catch (err) {
    err.statusCode = 400
    next(err)
  }
}

const createChat = async (req, res) => {
  try {
    const { users } = req.body
    const { id, username } = req.user

    if (users.length < 1) {
      throw new Error("Chat must have at least 2 members")
    }

    const userIdsInChat = [id]
    for (let user of users) {
      userIdsInChat.push(user._id)
    }

    const chatName =
      users.map((user) => user.username).join(", ") + ", " + username

    const newChat = await Chat.create({
      users: [...new Set(userIdsInChat)].map((id) => ObjectId(id)),
      chatName,
    })
    res.status(201).json(newChat)
  } catch (err) {
    err.statusCode = 400
    next(err)
  }
}

const updateChat = async (req, res, next) => {
  try {
    const chatId = req.params.id
    const { updatedChat } = req.body

    console.log(updatedChat)

    const updatedMessage = await Chat.findOneAndUpdate(
      { _id: ObjectId(chatId) },
      updatedChat,
      { new: true }
    )

    res.status(200).json(updatedMessage)
  } catch (err) {
    console.log(err.message)
    err.statusCode = 400
    next(err)
  }
}

const deleteChat = async (req, res) => {
  const chatId = req.params.id

  try {
    await Chat.findOneAndDelete({ _id: ObjectId(chatId) })

    res.sendStatus(204)
  } catch (err) {
    err.statusCode = 400
    next(err)
  }
}

const getMessages = async (req, res, next) => {
  const { page = 1, limit = 20, skip = 0 } = req.query

  try {
    const chatId = req.params.id

    const startIndex = (page - 1) * limit + +skip

    const messages = await Message.find({ chat: chatId })
      .limit(limit)
      .skip(startIndex)
      .sort({ updatedAt: -1 })
      .populate("sender")
      .exec()

    for (let m of messages) {
      if (m.isDeleted) {
        m.content = "This message is deleted"
      }
    }

    res.status(200).json(messages)
  } catch (err) {
    console.log(err.message)
    err.statusCode = 400
    next(err)
  }
}

module.exports = {
  getChats,
  getChat,
  createChat,
  updateChat,
  deleteChat,
  getMessages,
}
