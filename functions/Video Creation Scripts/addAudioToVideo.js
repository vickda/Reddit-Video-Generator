const executeFFMPEGCommand = require('./executeFFMPEGCommand')

const addAudioToVideo = async (filename) => {
  const videoPath = `${process.env.VIDEO_FILES_PATH}/trimmedVideo.mp4`
  const audioPath = `${process.env.VIDEO_FILES_PATH}/${filename}.mp3`

  const command = [
    '-i',
    videoPath,
    '-i',
    audioPath,
    '-map',
    `0:v`,
    '-map',
    '1:a',
    '-c:v',
    'copy',
    '-shortest',
    `functions/Video Files/${filename}.mp4`,
  ]

  console.log('Adding audio to the video')
  const executeCommand = await executeFFMPEGCommand(command)

  if (executeCommand.includes('Command Failed Due')) return `${executeCommand}`

  return 'Command Executed Successfully'
}

module.exports = addAudioToVideo
