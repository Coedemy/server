const { Course, CourseCategory, CourseSection, CourseContent, Lecture, LectureContent } = require('../../schemas')
const { coursesSeeder } = require('./coursesSeeder')
const { courseSectionsSeeder } = require('./courseSectionsSeeder')
const { pickRandomElementsFromArray } = require('../../utils/array')

const createCourseSections = async () => {
  const sections = []
  for (let section of courseSectionsSeeder()) {
    const lectures = []
    for (let lecture of section.lectures) {
      const lectureContentDoc = await LectureContent.create(lecture.content)
      const lectureDoc = await Lecture.create({ content: lectureContentDoc._id })
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

    console.log({categoryDoc})
    //add randomly three sections to each course's curriculum
    Course.insertMany(category.courses.map(c => ({ ...c, category: categoryDoc._id, sections: pickRandomElementsFromArray(sections, 3) })))

  }
}

module.exports = {
  seedCoursesData
}