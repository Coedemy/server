const mongoose = require('mongoose')

const Schema = mongoose.Schema

const QuizSchema = new Schema({
  question: { type: String },
  answer: { type: String },
  wrongOptions: [{ type: String, default: [] }],
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('quizes', QuizSchema)