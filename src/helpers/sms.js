const AWS = require("aws-sdk")

const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY
const SNS = new AWS.SNS({
  apiVersion: "2010-03-31",
  region,
  accessKeyId,
  secretAccessKey,
})

const sendSMS = async ({ phoneNumber, message }) => {
  console.log({ phoneNumber, message })
  if (!phoneNumber || !message) {
    const errMsg = "missing phone number or messsage from the body"
    const err = new Error(errMsg)
    err.statusCode = 400
    throw err
  }

  const AttributeParams = {
    attributes: {
      DefaultSMSType: "Promotional",
    },
  }

  const messageParams = {
    Message: message,
    PhoneNumber: phoneNumber,
  }

  try {
    await SNS.setSMSAttributes(AttributeParams).promise()
    await SNS.publish(messageParams).promise()
  } catch (error) {
    console.log("error", error)
    const errMsg = "text failed to send"
    const err = new Error(errMsg)
    err.statusCode = 400
    throw err
  }
}

module.exports = { sendSMS }
