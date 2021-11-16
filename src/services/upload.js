const fs = require("fs")
const multer = require("multer")
const AWS = require("aws-sdk")

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY

//multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "storage/")
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + ".png")
  },
})
const upload = multer({ dest: "storage/", storage })

// uploads a file to s3
const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
})

function uploadFileToS3(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  }

  return s3.upload(uploadParams).promise()
}

function getFileStreamFromS3(fileKey) {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName,
    }
    const s3Obj = s3.getObject(downloadParams)
    return s3Obj.createReadStream()
  } catch (err) {
    console.log(err)
    throw err
  }
}

const uploadSingleFile = upload.single("image")

const uploadMultipleFiles = (uploadedFields) => {
  return upload.fields(
    uploadedFields.map((field) => ({
      name: field,
      maxCount: 1,
    }))
  )
}

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
  uploadFileToS3,
  getFileStreamFromS3,
}
