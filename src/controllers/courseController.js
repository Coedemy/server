const { Course, CourseCategory } = require('../schemas')
const { groupObjectByKey } = require('../utils/object')

const getCourseCategoriesList = async (req, res, next) => {
  const courseCategoryList = await CourseCategory.find()

  res.json({
    total: courseCategoryList.length,
    courseCategoryList: courseCategoryList.map(c => ({ ...c._doc, isDeleted: undefined }))
  })
}

const getCoursesListByCategory = async (req, res, next) => {
  let courses = await Course.find().populate('category')
  courses = courses.map(c => ({ ...c._doc, category: c._doc.category.title }))

  res.json({
    total: courses.length,
    coursesByCategories: groupObjectByKey(courses, 'category')
  })
}

const getHighRatingCoursesList = async (req, res, next) => {

  res.json('getHighRatingCoursesList')
}

const getBestSellerCoursesList = async (req, res, next) => {

  res.json('getBestSellerCoursesList')
}

const searchCourses = async (req, res, next) => {

  res.json('searchCourses')
}

const getCourseDetail = async (req, res, next) => {

  res.json('getCourseDetail')
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
      category, content
    } = course

    const newCourse = await Course.create({
      title, subtitle, price, language, target, learningGoals, prerequisites,
      representativeTopic, welcomeMessage, congratulationsMessage, description,
      category, content
    })

    importedDoc.push(newCourse)
  }

  res.status(201).json({ total: importedDoc.length, newCourses: importedDoc })
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
  getCourseDetail, getCourseContent, searchCourses,
  createCourse, updateCourse, removeCourse, importManyCourses
}