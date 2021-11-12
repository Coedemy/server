const express = require('express')
const router = express.Router()

const { coursesController } = require('../controllers')

router.get('/categories' ,coursesController.getCourseCategoriesList)

router.get('/bestseller', coursesController.getBestSellerCoursesList)

router.get('/high-rating', coursesController.getHighRatingCoursesList)

router.post('/search', coursesController.searchCourses)

router.get('/', coursesController.getCoursesListByCategory)

router.post('/', coursesController.createCourse)

router.get('/:id/content, coursesController.getCourseContent')

router.get('/:id', coursesController.getCourseDetail)

router.patch('/:id', coursesController.updateCourse)

router.delete('/:id', coursesController.removeCourse)

module.exports = router