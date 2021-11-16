const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CourseSchema = new Schema({
  title: { type: String },
  subtitle: { type: String },
  price: { type: Number },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews', default: [] }],
  language: { type: String },
  target: [{ type: String, default: [] }],
  learningGoals: [{ type: String, default: [] }],
  prerequisites: [{ type: String, default: [] }],
  representativeTopic: { type: String },
  courseImage: { type: Schema.Types.ObjectId, ref: 'images' },
  promotionVideo: { type: String },
  welcomeMessage: { type: String },
  congratulationsMessage: { type: String },
  description: { type: String },
  content: { type: Schema.Types.ObjectId, ref: 'course_contents' },
  category: { type: Schema.Types.ObjectId, ref: 'course_categories' },
  instructors: { type: Schema.Types.ObjectId, ref: 'users' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('courses', CourseSchema)