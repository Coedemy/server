const mongoose = require('mongoose')

const Schema = mongoose.Schema

const VideoSchema = new Schema({
  title: { type: String },
  url: { type: String },
  length: { type: Number },
  extension: { type: String },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('videos', VideoSchema)