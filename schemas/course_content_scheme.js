const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CourseContentSchema = new Schema({
  sections: [{ type: Schema.Types.ObjectId, ref: 'sessions', default: [] }],
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('course_contents', CourseContentSchema)

