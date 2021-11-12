const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LectureSchema = new Schema({
  content: { type: Schema.Types.ObjectId, ref: 'lecture_content' },
  resource: [{ type: Schema.Types.ObjectId, ref: 'lecture_resource', default: [] }],
  description: { type: String },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('lectures', LectureSchema)