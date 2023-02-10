const fs = require('fs')
const executeFFMPEGCommand = require('./executeFFMPEGCommand')

const mergeAllFiles = async () => {
  const command = [
    '-y',
    '-f',
    'concat',
    '-safe',
    '0',
    '-i',
    `${process.env.VIDEO_FILES_PATH}/files.txt`,
    '-c',
    'copy',
    `${process.env.VIDEO_FILES_PATH}/FinalVideo.mp4`,
  ]

  // List of files that will be merged
  const fileList = fs
    .readdirSync(process.env.VIDEO_FILES_PATH)
    .filter((val) => val.includes('_final'))
    .map((val) => `file '${val}'`)

  // Generate a text file for ffmpeg command
  fs.writeFileSync(
    `${process.env.VIDEO_FILES_PATH}/files.txt`,
    fileList.join('\r\n')
  )

  console.log('Merging All videos into final video')
  await executeFFMPEGCommand(command)

  // Delete Generated text file for ffmpeg command
  fs.unlinkSync(`${process.env.VIDEO_FILES_PATH}/files.txt`)

  return 'Command Executed Successfully'
}

module.exports = mergeAllFiles
