const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CourseSectionSchema = new Schema({
  learningObjective: { type: String },
  title: { type: String },
  lectures: [{ type: Schema.Types.ObjectId, ref: 'lecture', default: [] }],
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('course_sections', CourseSectionSchema)