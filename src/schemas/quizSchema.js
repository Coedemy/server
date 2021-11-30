const mongoose = require('mongoose')

const Schema = mongoose.Schema

const QuizSchema = new Schema({
  question: { type: String },
  answer: { type: String },
  wrongOptions: [{ type: String, default: [] }],
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

module.exports = mongoose.model('quizzes', QuizSchema)