const { connectToMongoDb, disconnectFromMongDb } = require('../services/database')
const { seedCoursesData } = require('./courses/seedCoursesData')

const startSeeding = async () => {
  await connectToMongoDb()
  console.log("Seeding................................")
  await seedCoursesData()
  await disconnectFromMongDb()
}

startSeeding()