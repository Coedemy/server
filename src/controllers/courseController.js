const _ = require('lodash')
const { ObjectId } = require('mongodb')
const fs = require('fs')
const util = require('util')
const slugify = require('slugify')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFileToS3, getSignedUrl } = require('../helpers/upload')
const { Course, CourseCategory, CourseSection, Lecture, Review, User } = require('../schemas')

const getCourseCategoriesList = async (req, res, next) => {
  const courseCategoryList = await CourseCategory.find()

  res.json({
    total: courseCategoryList.length,
    courseCategoryList
  })
}

const getCoursesListByCategory = async (req, res, next) => {
  let courses = await Course.find().populate('category', 'title').populate('reviews')
    .select('title subtitle slug price language representativeTopic learningGoals courseImage category reviews averageRating description sections isPublished')
    .populate({
      path: 'sections'
    })
  courses = courses
    // .filter(course => course.isPublished)
    .map(course => {
      //get first lecture id
      if (course.sections.length <= 0) return course
      const courseWithFirstLecture = { ...course._doc, firstLecture: course.sections[0]?.lectures[0] }
      delete courseWithFirstLecture.sections
      return courseWithFirstLecture
    })

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
  const queries = req.query
  const userId = req.body.userId

  const courseDoc = await Course.findOne(queries).populate('category', 'title').populate('reviews').populate({
    path: 'sections',
    select: '-isDeleted -__v',
    populate: {
      path: 'lectures',
      select: '-isDeleted -__v',
      populate: {
        path: 'content',
        select: '-isDeleted -__v',
        populate: {
          path: 'video',
          select: '-isDeleted -__v'
        }
      }
    }
  })

  //calculate totalHours and totalLectures of all course sections
  if (!courseDoc) return res.status(200).json({})
  let course = courseDoc.toObject()
  course.totalHours = course.sections.reduce((totalHours, section) => totalHours + section.lectures.reduce((totalSectionHours, lecture) => {
    if (lecture.content.lectureContentType === 'VIDEO') {
      return totalSectionHours + lecture.content.video.duration
    }
    return totalSectionHours
  }, 0), 0)
  course.totalLectures = course.sections.reduce((totalLectures, section) => totalLectures + section.lectures.length, 0)
  course.firstLecture = course.sections[0]?.lectures[0]._id

  let isPurchasedByUser = false
  if (userId) {
    const foundUser = await User.findById(userId)
    if (foundUser) {
      isPurchasedByUser = foundUser.myLearning.includes(course._id)
    }
  }

  course.sections = course.sections.map(section => {
    const updatedLectures = section.lectures.map(lecture => {
      const type = lecture.content.lectureContentType
      const updatedLecture = lecture
      if (!isPurchasedByUser) {
        lecture.isLocked = false
        if (!lecture.canPreview) {
          lecture.isLocked = true
          if (type === 'VIDEO') {
            delete updatedLecture.content.video.url
            delete updatedLecture.content.video.alt
          }
          else if (type === 'ARTICLE') {
            delete updatedLecture.content.articleContent
          }
        }
      }
      else {
        lecture.isLocked = false
      }
      return updatedLecture
    })
    return { ...section, lectures: updatedLectures }
  })

  res.json({ isPurchasedByUser, course })
}

const createCourse = async (req, res, next) => {
  // courseImage, promotionVideo, rating
  const { title, category } = req.body
  const userId = req.user.id

  const newCourse = await Course.create({ title, category, instructor: userId, slug: slugify(title, { lower: true }) })
  const updatedUser = await User.findOneAndUpdate(
    { _id: ObjectId(userId) },
    { $push: { myTeaching: newCourse._id } },
    { new: true }
  )

  res.status(201).json({ course: newCourse })
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
  const user = req.user

  const { numberOfStars, comment, reviewer } = req.body
  // const foundReview = await Review.findOne({
  //   _id: courseId,
  //   reviewer: user.id
  // })

  // console.log({ foundReview, courseId })
  // if (foundReview) {
  //   const updatedReview = await Review.findOneAndUpdate(
  //     { _id: courseId, reviewer: user.id },
  //     { $set: { numberOfStars, comment } }
  //   )
  //   return res.json({ review: updatedReview })
  // }

  //new review
  const newReview = await Review.create({ numberOfStars, comment, reviewer: user.id })

  console.log({ newReview })

  await Course.findOneAndUpdate(
    { _id: ObjectId(courseId) },
    { $push: { reviews: newReview } },
    { new: true }
  )

  res.json({ review: newReview })
}

const updateCourse = async (req, res, next) => {
  const courseId = req.params.id
  const updateOptions = { ...req.body }

  if (req.files) {
    const { courseImage, promotionVideo } = req.files

    if (courseImage) {
      const courseImageResult = await uploadFileToS3(courseImage[0])
      await unlinkFile(courseImage[0].path)
      updateOptions['courseImage'] = getSignedUrl({ key: courseImageResult.Key })
    }

    if (promotionVideo) {
      const promotionVideoResult = await uploadFileToS3(promotionVideo[0])
      await unlinkFile(promotionVideo[0].path)
      updateOptions['promotionVideo'] = getSignedUrl({ key: promotionVideoResult.Key })
    }
  }

  console.log({ updateOptions })

  const updatedCourse = await Course.findOneAndUpdate(
    { _id: ObjectId(courseId) },
    {
      $set: { ...updateOptions }
    },
    { new: true }
  )

  res.json({ updatedCourse })
}

const removeCourse = async (req, res, next) => {
  res.json('remove course')
}

const addCourseToCart = async (req, res, next) => {
  const user = req.user
  const courseId = req.params.id

  res.json({ user, courseId })
}

const removeCourseFromCart = async (req, res, next) => {
  const user = req.user
  const courseId = req.params.id

  res.json({ user, courseId })
}

module.exports = {
  getCourseCategoriesList, getCoursesListByCategory, getAllCourseSections,
  getHighRatingCoursesList, getBestSellerCoursesList, getAllCourseLectures,
  getCourseDetail, searchCourses, reviewCourse, addCourseToCart, removeCourseFromCart,
  createCourse, updateCourse, removeCourse, importManyCourses, importManyCategories
}