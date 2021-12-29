const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VideoSchema = new Schema({
  url: { type: String, default: '' },
  duration: { type: Number, default: 0 },
  title: { type: String, default: '' },
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, obj) {
      delete obj.isDeleted
      delete obj.__v
      return obj
    }
  }
})

module.exports = mongoose.model('videos', VideoSchema)