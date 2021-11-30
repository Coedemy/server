const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LectureResourceType = {
  DOWNLOADABLE_FILE: 'DOWNLOADABLE_FILE',
  EXTERNAL_RESOURCE: 'EXTERNAL_RESOURCE'
}

const LectureResourceSchema = new Schema({
  lectureResourceType: { type: LectureResourceType, defaultValue: LectureResourceType.EXTERNAL_RESOURCE },
  resourceUrl: { type: String },
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

module.exports = mongoose.model('lecture_resources', LectureResourceSchema)