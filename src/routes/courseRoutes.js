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

router.post('/sections/:sectionId/lectures', requireAuth, courseController.createLecture)

router.patch('/sections/:sectionId/reorder', requireAuth, courseController.updateLecturesOrder)

router.post('/lectures/:lectureId', requireAuth, uploadMultipleFiles(['contentFile', 'resourceFile']), courseController.updateLectureContent)

router.post('/detail', courseController.getCourseDetail)

router.post('/:id/publish', requireAuth, courseController.togglePublishCourse)

router.post('/:id/sections', requireAuth, courseController.createSection)

router.patch('/:id/reorder', requireAuth, courseController.updateSectionsOrder)

router.post('/:id/review', requireAuth, courseController.reviewCourse)

router.get('/:id/sections', courseController.getCourseSections)

router.post('/:id/add-to-cart', requireAuth, courseController.addCourseToCart)

router.post('/:id/remove-from-cart', requireAuth, courseController.removeCourseFromCart)

router.patch('/:id', requireAuth, uploadMultipleFiles(['courseImage', 'promotionVideo']), courseController.updateCourse)

router.delete('/:courseId/sections/:sectionId', courseController.removeSection)

router.delete('/sections/:sectionId/lectures/:lectureId', courseController.removeLecture)

router.delete('/:id', requireAuth, courseController.removeCourse)

module.exports = router