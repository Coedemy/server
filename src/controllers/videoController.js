
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFileToS3, getFileStreamFromS3, getSignedUrl } = require('../helpers/upload')

const transcode = async (req, res, next) => {
  const { video: videoFiles } = req.files
  try {
    const result = await uploadFileToS3(videoFiles[0])
    console.log(result.Location)
    await unlinkFile(videoFiles[0].path)
    res.json({ result })
  }
  catch (err) {
    next(err)
  }
}

const streamVideo = async (req, res) => {
  // const { videoKey } = req.params
  const key = 'lecture-videos/1640143298375-video.mp4'
  // const readStream = getFileStreamFromS3(key)

  // readStream.pipe(res)
  const url = getSignedUrl({ key })
  res.json({ url })
}

module.exports = { transcode, streamVideo }