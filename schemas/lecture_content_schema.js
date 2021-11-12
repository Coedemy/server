const mongoose = require('mongoose')

const LectureContentType = {
  VIDEO: 'VIDEO',
  ARTICLE: 'ARTICLE'
}

exports.LectureContentType = LectureContentType

const Schema = mongoose.Schema

const LectureContentSchema = new Schema({
  lectureContentType: { type: LectureContentType, defaultValue: ContentType.ARTICLE },
  articleContent: { type: String },
  videoUrl: { type: String },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('lecture_contents', LectureContentSchema)