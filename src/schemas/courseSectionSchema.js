const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CourseSectionSchema = new Schema({
  learningObjective: { type: String, default: '' },
  title: { type: String, default: '' },
  lectures: [{ type: Schema.Types.ObjectId, ref: 'lectures', default: [] }],
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

// CourseSectionSchema.methods.totalHours = function () {
  
// }

// CourseSectionSchema.methods.totalLecture = function () {

// }
 
module.exports = mongoose.model('course_sections', CourseSectionSchema)