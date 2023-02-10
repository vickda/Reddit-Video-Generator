const executeFFMPEGCommand = require('./executeFFMPEGCommand')

const addScreenshotsToVideo = async (filename, device) => {
  const videoPath = `${process.env.VIDEO_FILES_PATH}/${filename}.mp4`
  const imagePath = `${process.env.VIDEO_FILES_PATH}/${filename}.png`

  const command = [
    '-y',
    '-i',
    videoPath,
    '-i',
    imagePath,
    '-filter_complex',
    `[1][0]scale2ref=w=oh*mdar:h=ih*0.25[logo][video];[video][logo]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2:enable='between(t,0,20)'`,
    '-preset',
    'fast',
    `functions/Video Files/${filename}_final.mp4`,
  ]

  if (device.toLowerCase() === 'mobile') {
    command[6] = `overlay=(W-w)/2:(H-h)/2`
  }

  console.log('Adding screenshot to video')
  const executeCommand = await executeFFMPEGCommand(command)

  if (executeCommand.includes('Command Failed Due')) return `${executeCommand}`

  return 'Command Executed Successfully'
}

module.exports = addScreenshotsToVideo
