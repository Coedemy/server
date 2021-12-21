const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LectureSchema = new Schema({
  title: { type: String, default: '' },
  content: { type: Schema.Types.ObjectId, ref: 'lecture_contents' },
  resource: [{ type: Schema.Types.ObjectId, ref: 'lecture_resources', default: [] }],
  canPreview: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, obj) {
      delete obj.isDeleted
      delete obj.__v
      return obj
    }
  },
  toObject: {
    transform: function (doc, obj) {
      delete obj.isDeleted
      delete obj.__v
      return obj
    }
  }
})

module.exports = mongoose.model('lectures', LectureSchema)