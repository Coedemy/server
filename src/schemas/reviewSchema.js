const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  numberOfStars: { type: Number },
  comment: { type: String },
  reviewer: { type: Schema.Types.ObjectId, ref: 'users' },
  reply: { type: Schema.Types.ObjectId, ref: 'reviews', default: null },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('reviews', ReviewSchema)