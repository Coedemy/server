const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CourseCategorySchema = new Schema({
  title: { type: String },
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


module.exports = mongoose.model('course_categories', CourseCategorySchema)

