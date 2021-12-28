const mongoose = require('mongoose')

const LectureContentType = {
  EMPTY: 'EMPTY',
  VIDEO: 'VIDEO',
  ARTICLE: 'ARTICLE',
  QUIZ: 'QUIZ'
}

exports.LectureContentType = LectureContentType

const Schema = mongoose.Schema

const LectureContentSchema = new Schema({
  lectureContentType: { type: LectureContentType, defaultValue: LectureContentType.EMPTY },
  articleContent: { type: String, default: '' },
  video: { type: Schema.Types.ObjectId, ref: 'videos' },
  quizzesList: [{ type: Schema.Types.ObjectId, ref: 'quizzes', default: [] }],
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

module.exports = mongoose.model('lecture_contents', LectureContentSchema)