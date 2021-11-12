const AWS = require("aws-sdk")

const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY

const SES = new AWS.SES({ region, accessKeyId, secretAccessKey })

const sendEmailSES = async ({ to, from, subject, text }) => {
  if (!to || !from || !subject || !text) {
    const errMsg = "to, from, subject and text are all required in the body!"
    const err = new Error(errMsg)
    err.statusCode = 400
    throw err
  }

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: text },
      },
      Subject: { Data: subject },
    },
    Source: from,
  }

  try {
    await SES.sendEmail(params).promise()
  } catch (error) {
    console.log(error)
    const errMsg = "Failed to send email!"
    const err = new Error(errMsg)
    err.statusCode = 400
    throw err
  }
}

module.exports = { sendEmailSES }
