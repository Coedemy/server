const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  numberOfStars: { type: Number },
  comment: { type: String },
  reviewer: { type: Schema.Types.ObjectId, ref: 'users' },
  reply: { type: Schema.Types.ObjectId, ref: 'reviews', default: null },
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

module.exports = mongoose.model('reviews', ReviewSchema)