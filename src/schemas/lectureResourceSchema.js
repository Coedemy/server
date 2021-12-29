const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LectureResourceType = {
  EMPTY: 'EMPTY',
  DOWNLOADABLE_FILE: 'DOWNLOADABLE_FILE',
  EXTERNAL_RESOURCE: 'EXTERNAL_RESOURCE'
}

const LectureResourceSchema = new Schema({
  lectureResourceType: { type: LectureResourceType, defaultValue: LectureResourceType.EMPTY },
  resourceUrl: String,
  title: String,
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

module.exports = mongoose.model('lecture_resources', LectureResourceSchema)