const mongoose = require('mongoose')
const slugify = require('slugify')

const ReviewSchema = require('./reviewSchema')
const { defaultCourseImageUrl } = require('../constants')

const Schema = mongoose.Schema

const CourseSchema = new Schema({
  title: { type: String, default: '' },
  slug: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  price: { type: Number },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'reviews', default: [] }],
  averageRating: { type: Number, default: 0 },
  language: { type: String, default: 'en' },
  target: [{ type: String, default: '' }],
  learningGoals: [{ type: String, default: [] }],
  prerequisites: [{ type: String, default: [] }],
  representativeTopic: { type: String, default: '' },
  courseImage: { type: String, default: defaultCourseImageUrl },
  promotionVideo: { type: String, default: '' },
  level: { type: Number, default: 0 },
  welcomeMessage: { type: String, default: '' },
  congratulationsMessage: { type: String, default: '' },
  description: { type: String, default: '' },
  sections: [{ type: Schema.Types.ObjectId, ref: 'course_sections', default: [] }],
  firstLecture: { type: Schema.Types.ObjectId, ref: 'lectures' },
  category: { type: Schema.Types.ObjectId, ref: 'course_categories' },
  instructor: { type: Schema.Types.ObjectId, ref: 'users' },
  isPublished: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
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

CourseSchema.post('findOneAndUpdate', async (data) => {

  //populate all reviews by _id
  if (!data) return
  const populatedReviews = await ReviewSchema.find({
    _id: { $in: data.reviews }
  })

  const numberOfReviews = populatedReviews.length

  //calculate number of star when a new review was post
  console.log({ numberOfReviews })
  if (numberOfReviews === 0) return
  if (numberOfReviews === 1)
    data.averageRating = populatedReviews[numberOfReviews - 1].numberOfStars
  else {
    data.averageRating = ((numberOfReviews - 1) * data.averageRating + populatedReviews[numberOfReviews - 1].numberOfStars) / numberOfReviews
  }
  data.averageRating = data.averageRating.toFixed(1)

  data.save()
})

module.exports = mongoose.model('courses', CourseSchema)