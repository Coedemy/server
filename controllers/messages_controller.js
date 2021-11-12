const { ObjectId } = require("mongodb")

const { Message } = require("../schemas")

const createMessage = async (req, res, next) => {
  try {
    const sender = req.user
    const { content, chatId, type } = req.body

    const newMessage = await Message.create({
      sender: ObjectId(sender.id),
      content,
      chat: ObjectId(chatId),
      type,
    })

    res.status(201).json(newMessage)
  } catch (err) {
    err.statusCode = 400
    next(err)
  }
}

const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id

    await Message.findOneAndUpdate(
      { _id: ObjectId(messageId) },
      { $set: { isDeleted: true } }
    )

    res.sendStatus(204)
  } catch (err) {
    err.statusCode = 400
    next(err)
  }
}

const markAsRead = async (req, res) => {}

module.exports = {
  createMessage,
  deleteMessage,
  markAsRead,
}
