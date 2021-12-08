const { connectToMongoDb, disconnectFromMongDb } = require('../helpers/database')
const { seedCoursesData } = require('./courses/seedCoursesData')

const startSeeding = async () => {
  await connectToMongoDb()
  console.log("Seeding................................")
  await seedCoursesData()
  await disconnectFromMongDb()
}

startSeeding()