const { Course, CourseCategory } = require('../schemas')

const getCourseCategoriesList = async (req, res, next) => {
  const courseCategoryList = await CourseCategory.find()
  res.json({
    total: courseCategoryList.length,
    courseCategoryList
  })
}

const getCoursesListByCategory = async (req, res, next) => {

  console.log('getCoursesListByCategory')
}

const getHighRatingCoursesList = async (req, res, next) => {

  console.log('getHighRatingCoursesList')
}

const getBestSellerCoursesList = async (req, res, next) => {

  console.log('getBestSellerCoursesList')
}

const searchCourses = async (req, res, next) => {

  console.log('searchCourses')
}

const getCourseDetail = async (req, res, next) => {

  console.log('getCourseDetail')
}

const getCourseContent = async (req, res, next) => {

  console.log('getCourseContent')
}

const createCourse = async (req, res, next) => {
  // courseImage, promotionVideo, rating
  const {
    title, price, language, target, learningGoals, requirement,
    representativeTopic, welcomeMessage, congratulationsMessage, description,
    categoryId, courseContentId
  } = req.body

  const newCourse = Course.create({
    title, price, language, target, learningGoals, requirement,
    representativeTopic, welcomeMessage, congratulationsMessage, description,
    categoryId, courseContentId
  })

  res.status(201).json({ newCourse })
}

const updateCourse = async (req, res, next) => {
  
}

const removeCourse = async (req, res, next) => {

}

module.exports = {
  getCourseCategoriesList, getCoursesListByCategory,
  getHighRatingCoursesList, getBestSellerCoursesList,
  getCourseDetail, getCourseContent, searchCourses,
  createCourse, updateCourse, removeCourse
}