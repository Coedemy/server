const express = require('express')
const router = express.Router()

const { courseController } = require('../controllers')

router.get('/categories', courseController.getCourseCategoriesList)

router.get('/bestseller', courseController.getBestSellerCoursesList)

router.get('/high-rating', courseController.getHighRatingCoursesList)

router.post('/search', courseController.searchCourses)

router.get('/', courseController.getCoursesListByCategory)

router.post('/', courseController.createCourse)

router.post('/many', courseController.importManyCourses)

router.get('/:id/content', courseController.getCourseContent)

router.get('/:id', courseController.getCourseDetail)

router.patch('/:id', courseController.updateCourse)

router.delete('/:id', courseController.removeCourse)

module.exports = router