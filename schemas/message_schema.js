const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Schema = mongoose.Schema

exports.MessageType = {
  TEXT: "TEXT",
  STICKER: "STICKER"
}

const MessageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, trim: true },
  type: { type: String, enum: ["TEXT", "STICKER"], default: "TEXT" },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
  readBy: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

MessageSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('message', MessageSchema)