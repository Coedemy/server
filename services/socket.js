const socketIo = require("socket.io")

const { Message, Chat } = require("../schemas")
const { ObjectId } = require("mongodb")

const corsOptions = {
  cors: {
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  },
}

const connectSocket = async (server) => {
  const io = await socketIo(server, corsOptions)
  io.on("connection", (socket) => {
    socket.emit("user_connected")

    socket.on("send_msg", async (payload) => {
      const { content, sender, chat, type } = payload
      // create new message
      const msg = {
        content,
        chat: ObjectId(chat),
        sender: ObjectId(sender._id),
        type,
      }
      try {
        const newMessage = await Message.create(msg)

        //assign to latest message of chat
        const updatedChat = await Chat.findOneAndUpdate(
          { _id: ObjectId(chat) },
          { latestMessage: newMessage._id, updatedAt: newMessage.updatedAt },
          { new: true }
        )

        io.to(chat).emit("receive_msg", {
          newMessage: { ...payload, sender, updatedAt: newMessage.updatedAt },
          chat: updatedChat,
        })
      } catch (err) {
        console.log(err)
        throw err
      }
    })

    socket.on("join_conversation", (payload) => {
      const conversationId = payload
      socket.join(conversationId)
    })

    socket.on("add_conversation", (payload) => {
      const conversation = payload
      socket.join(conversation._id)
      socket.broadcast.emit("is_invited_to_conversation", conversation)
    })

    socket.on("start_calling", (payload) => {
      const { chatId, userPeerId } = payload

      socket.join(chatId)

      console.log("should be called ")
      socket
        .to(chatId)
        .broadcast.emit("be_called", { caller: userPeerId, chatId })

      socket.on("leave_call", () => {
        socket.to(chatId).broadcast.emit("one_leave_call", userPeerId)
      })
    })

    socket.on("join_call", (payload) => {
      const { chatId, userPeerId } = payload
      console.log(userPeerId)
      socket.to(chatId).broadcast.emit("user_join_call", payload)
    })
  })
}

module.exports = {
  connectSocket,
}
