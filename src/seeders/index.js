const { connectToMongoDb, disconnectFromMongDb } = require('../services/database')
const { seedCourseData } = require('./courseSeeder')

const startSeeding = async () => {
  await connectToMongoDb()
  console.log("Seeding................................")
  await seedCourseData()
  await disconnectFromMongDb()
}

startSeeding()