const _ = require('lodash')

const { ObjectId } = require('mongodb')
const { Course, CourseCategory, Review } = require('../schemas')
// const { groupObjectByKey } = require('../utils/object')

const getCourseCategoriesList = async (req, res, next) => {
  const courseCategoryList = await CourseCategory.find()

  res.json({
    total: courseCategoryList.length,
    courseCategoryList: courseCategoryList.map(c => ({ ...c._doc, isDeleted: undefined }))
  })
}

const getCoursesListByCategory = async (req, res, next) => {
  let courses = await Course.find().populate('category').populate('reviews')
  courses = courses.map(c => {
    if (c.reviews.length === 0) return {
      ...c._doc, category: c._doc.category.title
    }

    return { ...c._doc, category: c._doc.category.title }
  })

  res.json({
    total: courses.length,
    coursesByCategories: _.groupBy(courses.map(c => _.pick(c, '_id', 'reviews', 'title', 'averageRating', 'courseImage', 'promotionVideo', 'description', 'instructor', 'price', 'category')), 'category')
  })
}

const getHighRatingCoursesList = async (req, res, next) => {
  const courses = await Course.find().populate('category')

  res.json('getHighRatingCoursesList')
}

const getBestSellerCoursesList = async (req, res, next) => {

  res.json('getBestSellerCoursesList')
}

const searchCourses = async (req, res, next) => {

  res.json('searchCourses')
}

const getCourseDetail = async (req, res, next) => {
  const courseId = req.params.id
  const course = await Course.findById(courseId)

  res.json({ course: _.omit(course._doc, '__v', 'isDeleted') })
}

const getCourseContent = async (req, res, next) => {
  res.json('getCourseContent')
}

const createCourse = async (req, res, next) => {
  // courseImage, promotionVideo, rating
  const {
    title, subtitle, price, language, target, learningGoals, prerequisites,
    representativeTopic, welcomeMessage, congratulationsMessage, description,
    category, content
  } = req.body

  const newCourse = await Course.create({
    title, subtitle, price, language, target, learningGoals, prerequisites,
    representativeTopic, welcomeMessage, congratulationsMessage, description,
    category, content
  })

  res.status(201).json({ newCourse })
}

const importManyCourses = async (req, res, next) => {
  const importedCourses = req.body.courses
  const importedDoc = []

  for (let course of importedCourses) {
    const {
      title, subtitle, price, language, target, learningGoals, prerequisites,
      representativeTopic, welcomeMessage, congratulationsMessage, description,
      category, content, courseImage, promotionVideo
    } = course

    const newCourse = await Course.create({
      title, subtitle, price, language, target, learningGoals, prerequisites,
      representativeTopic, welcomeMessage, congratulationsMessage, description,
      category, content, courseImage, promotionVideo
    })

    importedDoc.push(newCourse)
  }

  res.status(201).json({ total: importedDoc.length, newCourses: importedDoc })
}

const reviewCourse = async (req, res, next) => {
  const courseId = req.params.id
  const { numberOfStars, comment, reviewer } = req.body
  const newReview = await Review.create({ numberOfStars, comment, reviewer })

  const updatedCourse = await Course.findOneAndUpdate(
    { _id: ObjectId(courseId) },
    { $push: { reviews: newReview } },
    { new: true }
  )
  res.json({ updatedCourse })
}

const updateCourse = async (req, res, next) => {
  res.json('update course')
}

const removeCourse = async (req, res, next) => {
  res.json('remove course')
}

module.exports = {
  getCourseCategoriesList, getCoursesListByCategory,
  getHighRatingCoursesList, getBestSellerCoursesList,
  getCourseDetail, getCourseContent, searchCourses, reviewCourse,
  createCourse, updateCourse, removeCourse, importManyCourses
}