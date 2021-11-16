const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  numberOfStar: { type: Number },
  comment: { type: String },
  reviewer: { type: Schema.Types.ObjectId, ref: 'users' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('reviews', ReviewSchema)