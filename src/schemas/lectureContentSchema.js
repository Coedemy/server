const mongoose = require('mongoose')

const LectureContentType = {
  VIDEO: 'VIDEO',
  ARTICLE: 'ARTICLE',
  QUIZ: 'QUIZ'
}

exports.LectureContentType = LectureContentType

const Schema = mongoose.Schema

const LectureContentSchema = new Schema({
  lectureContentType: { type: LectureContentType, defaultValue: LectureContentType.ARTICLE },
  articleUrl: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  quizesList: [{ type: Schema.Types.ObjectId, ref: 'quizes', default: [] }],
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('lecture_contents', LectureContentSchema)