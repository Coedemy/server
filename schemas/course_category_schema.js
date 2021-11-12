const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CourseCategorySchema = new Schema({
  title: { type: String },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('course_categories', CourseCategorySchema)

