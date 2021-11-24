const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LectureSchema = new Schema({
  content: { type: Schema.Types.ObjectId, ref: 'lecture_contents' },
  resource: [{ type: Schema.Types.ObjectId, ref: 'lecture_resources', default: [] }],
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('lectures', LectureSchema)