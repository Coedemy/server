const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LectureResourceType = {
  DOWNLOADABLE_FILE: 'DOWNLOADABLE_FILE',
  EXTERNAL_RESOURCE: 'EXTERNAL_RESOURCE'
}

const LectureResourceSchema = new Schema({
  lectureResourceType: { type: LectureResourceType, defaultValue: ContentType.EXTERNAL_RESOURCE },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('lecture_resources', LectureResourceSchema)