const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RatingSchema = new Schema({
  star: { type: Number },
  review: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('ratings', RatingSchema)