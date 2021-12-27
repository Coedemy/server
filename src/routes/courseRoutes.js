const express = require('express')
const router = express.Router()

const { courseController } = require('../controllers')
const { requireAuth } = require('../middlewares/require_auth')
const { uploadMultipleFiles } = require('../helpers/upload')

router.get('/categories', courseController.getCourseCategoriesList)

router.post('/categories', courseController.importManyCategories)

router.get('/sections', courseController.getAllCourseSections)

router.get('/lectures', courseController.getAllCourseLectures)

router.get('/bestseller', courseController.getBestSellerCoursesList)

router.get('/high-rating', courseController.getHighRatingCoursesList)

router.post('/search', courseController.searchCourses)

router.get('/', courseController.getCoursesListByCategory)

router.post('/', requireAuth, courseController.createCourse)

router.post('/many', courseController.importManyCourses)

router.post('/:id/review', requireAuth, courseController.reviewCourse)

router.post('/detail', courseController.getCourseDetail)

router.post('/:id/add-to-cart', requireAuth, courseController.addCourseToCart)

router.post('/:id/remove-from-cart', requireAuth, courseController.removeCourseFromCart)

router.patch('/:id', requireAuth, uploadMultipleFiles(['courseImage', 'promotionVideo']), courseController.updateCourse)

router.delete('/:id', courseController.removeCourse)

module.exports = router