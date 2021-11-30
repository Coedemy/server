const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ImageSchema = new Schema({
  title: { type: String },
  url: { type: String },
  extension: { type: String },
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, obj) {
      delete obj.isDeleted
      delete obj.__v
      return obj
    }
  }})

module.exports = mongoose.model('images', ImageSchema)