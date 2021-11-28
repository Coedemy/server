const _ = require('lodash')

const { ObjectId } = require('mongodb')
const { Course, CourseCategory, CourseContent, CourseSection, Lecture, Review } = require('../schemas')
// const { groupObjectByKey } = require('../utils/object')

const getCourseCategoriesList = async (req, res, next) => {
  const courseCategoryList = await CourseCategory.find().select('title')

  res.json({
    total: courseCategoryList.length,
    courseCategoryList
  })
}

const getCoursesListByCategory = async (req, res, next) => {
  let courses = await Course.find().populate('category', 'title').populate('reviews')
    .select('title subtitle price language representativeTopic courseImage category reviews averageRating description')
  // courses = courses.map(c => ({
  //   ...c._doc,
  //   category: c._doc.category.title,
  //   reviews: c._doc.reviews.map(review => _.pick(review, '_id', 'reply', 'numberOfStars', 'comment', 'reviewer'))
  // }))
  res.json({
    total: courses.length,
    courses: courses
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

const getAllCourseSections = async (req, res, next) => {
  const sections = await CourseSection.find()
  res.json({
    total: sections.length,
    sections
  })
}

const getAllCourseLectures = async (req, res, next) => {
  const lectures = await Lecture.find()
  res.json({
    total: lectures.length,
    lectures
  })
}

const getCourseDetail = async (req, res, next) => {
  const courseId = req.params.id
  let course = await Course.findById(courseId).populate('category', 'title').populate('reviews').populate({
    path: 'sections',
    select: '-isDeleted -__v',
    populate: {
      path: 'lectures',
      select: '-isDeleted -__v',
      populate: {
        path: 'content',
        select: '-isDeleted -__v',
      }
    }
  })

  course = {
    ...course,
    category: course.category.title,
    // reviews: course.reviews.map(review => _.pick(review, '_id', 'reply', 'numberOfStars', 'comment', 'reviewer')),
    // sections: course.sections.map(section => _.pick(section, '_id', ))
  }

  res.json({ course: _.omit(course._doc, '__v', 'isDeleted') })
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

const importManyCategories = async (req, res, next) => {
  const importedCategories = req.body.categories
  console.log({ importedCategories })
  const importedCategoryDocs = []

  for (let category of importedCategories) {
    const { title } = category
    const newCategory = await CourseCategory.create({ title })
    importedCategoryDocs.push(newCategory)
  }

  res.status(201).json({ total: importedCategoryDocs.length, importedCategoryDocs })
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
  getCourseCategoriesList, getCoursesListByCategory, getAllCourseSections,
  getHighRatingCoursesList, getBestSellerCoursesList, getAllCourseLectures,
  getCourseDetail, searchCourses, reviewCourse,
  createCourse, updateCourse, removeCourse, importManyCourses, importManyCategories
}