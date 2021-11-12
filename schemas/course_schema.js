const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CourseSchema = new Schema({
  title: { type: String },
  price: { type: Number },
  rating: [{ type: Schema.Types.ObjectId, ref: 'rating', default: [] }],
  language: { type: String },
  target: { type: String },
  learningGoals: { type: String },
  requirement: { type: String },
  representativeTopic: { type: String },
  courseImage: { type: String },
  promotionVideo: { type: String },
  welcomeMessage: { type: String },
  congratulationsMessage: { type: String },
  description: { type: String },
  courseContentId: { type: Schema.Types.ObjectId, ref: 'course_content' },
  categoryId: { type: Schema.Types.ObjectId, ref: 'course_category' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('courses', CourseSchema)