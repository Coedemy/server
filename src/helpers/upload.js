const fs = require('fs')
const multer = require('multer')
const AWS = require('aws-sdk')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY
const LECTURE_VIDEOS_FOLDER_NAME = process.env.AWS_LECTURE_VIDEOS_FOLDER_NAME

//multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'src/storage/')
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname)
  },
})
const upload = multer({ dest: 'src/storage/', storage })

// uploads a file to s3
const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey
})

function uploadFileToS3(file) {
  const fileStream = fs.createReadStream(file.path)

  let fileType = 'other'
  if (file.mimetype.includes('image')) {
    fileType = 'image'
  }
  else if (file.mimetype.includes('video')) {
    fileType = 'video'
  }

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: LECTURE_VIDEOS_FOLDER_NAME + `${fileType}/` + file.filename,
  }

  return s3.upload(uploadParams).promise()
}

const getSignedUrl = ({ key, expires }) => {
  console.log({ key })
  const signedUrl = s3.getSignedUrl('getObject', {
    Key: key,
    Bucket: bucketName,
    Expires: expires || 9000, // S3 default is 900 seconds (15 minutes)
  })

  return signedUrl
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

const uploadSingleFile = upload.single('image')

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
  getSignedUrl
}