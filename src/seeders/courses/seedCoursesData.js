const slugify = require('slugify')

const { Course, CourseCategory, CourseSection, Video, Lecture, LectureContent } = require('../../schemas')
const { coursesSeeder } = require('./coursesSeeder')
const { courseSectionsSeeder } = require('./courseSectionsSeeder')
const { pickRandomElementsFromArray } = require('../../utils/array')

const createCourseSections = async () => {
  const sections = []
  for (let section of courseSectionsSeeder()) {
    const lectures = []
    for (let lecture of section.lectures) {
      //handle if lecture is video
      let videoId = undefined
      if (lecture.content.lectureContentType === "VIDEO") {
        const videoDoc = await Video.create(lecture.content.video)
        videoId = videoDoc._id
      }
      
      const lectureContentDoc = await LectureContent.create({ ...lecture.content, video: videoId})
      const lectureDoc = await Lecture.create({ title: lecture.title, content: lectureContentDoc._id, canPreview: lecture.canPreview })
      lectures.push(lectureDoc._id)
    }

    const sectionDoc = await CourseSection.create({
      title: section.title,
      learningObjective: section.learningObjective,
      lectures
    })
    sections.push(sectionDoc._id)
  }

  return sections
}

const seedCoursesData = async () => {
  
  const sections = await createCourseSections()

  for (let category of coursesSeeder()) {
    const categoryDoc = await CourseCategory.create({ title: category.title })
    //add randomly three sections to each course's curriculum
    for (let course of category.courses) {
      course.slug = slugify(course.title, { lower: true } )
      course.category = categoryDoc._id
      course.sections = pickRandomElementsFromArray(sections, 6)
      Course.create(course)
    }
  }
}

module.exports = {
  seedCoursesData
}