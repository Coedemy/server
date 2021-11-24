const mongoose = require('mongoose')

const ReviewSchema = require('./reviewSchema')

const Schema = mongoose.Schema

const CourseSchema = new Schema({
  title: { type: String },
  subtitle: { type: String },
  price: { type: Number },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews', default: [] }],
  averageRating: { type: Number, default: 0 },
  language: { type: String },
  target: [{ type: String, default: [] }],
  learningGoals: [{ type: String, default: [] }],
  prerequisites: [{ type: String, default: [] }],
  representativeTopic: { type: String },
  courseImage: { type: String },
  promotionVideo: { type: String },
  welcomeMessage: { type: String },
  congratulationsMessage: { type: String },
  description: { type: String },
  sections: [{ type: Schema.Types.ObjectId, ref: 'course_sections', default: [] }],
  category: { type: Schema.Types.ObjectId, ref: 'course_categories' },
  instructors: { type: Schema.Types.ObjectId, ref: 'users' },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true })

CourseSchema.post('findOneAndUpdate', async (data) => {

  //populate all reviews by _id
  const populatedReviews = await ReviewSchema.find({
    _id: { $in: data.reviews }
  })

  const numberOfReviews = populatedReviews.length

  //calculate number of star when a new review was post
  if (numberOfReviews.length === 0) return
  if (numberOfReviews.length === 1)
    data.averageRating = populatedReviews[numberOfReviews - 1].numberOfStars
  else {
    data.averageRating = ((numberOfReviews - 1) * data.averageRating + populatedReviews[numberOfReviews - 1].numberOfStars) / numberOfReviews
  }
  data.averageRating = data.averageRating.toFixed(1)
  data.save()
});

module.exports = mongoose.model('courses', CourseSchema)