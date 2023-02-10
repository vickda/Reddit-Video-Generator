const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath('C:/path_ffmpeg/ffprobe')

const getAudioDuration = (filename) => {
  // const filePath = `${process.env.VIDEO_FILES_PATH}/${filename}_audio.mp3`
  const filePath = `${process.env.VIDEO_FILES_PATH}/${filename}.mp3`

  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, function (err, metadata) {
      //console.dir(metadata); // all metadata
      if (err) reject(err)

      const durationInSeconds = Math.round(metadata.format.duration) + 1

      const duration = new Date(durationInSeconds * 1000)
        .toISOString()
        .split('T')[1]
        .substring(0, 8)

      resolve(duration)
    })
  })
}

module.exports = getAudioDuration
