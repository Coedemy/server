const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ImageSchema = new Schema({
  title: { type: String },
  url: { type: String },
  extension: { type: String },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('images', ImageSchema)