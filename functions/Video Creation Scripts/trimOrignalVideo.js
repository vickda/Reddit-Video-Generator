const executeFFMPEGCommand = require('./executeFFMPEGCommand')

const trimOrignalVideo = async (maxTrimTime, device) => {
  const randomTime = `00:${Math.floor(Math.random() * 60) + 1}:${
    Math.floor(Math.random() * 60) + 1
  }`

  const commandForMobile = [
    '-vf',
    'crop=ih*(9/16):ih',
    '-crf',
    '21',
    '-preset',
    'fast',
    'functions/Video Files/trimmedVideo.mp4',
  ]

  let command = [
    '-y',
    '-ss',
    randomTime,
    '-i',
    `${process.env.BACKGROUND_VIDEO_FILES_PATH}/Minecraft video OG.webm`,
    '-to',
    maxTrimTime,
    '-c',
    'copy',
    'functions/Video Files/trimmedVideo.mp4',
  ]

  // Change Command For Mobile
  if (device.toLowerCase() === 'mobile') {
    command.splice(7)
    command = command.concat(commandForMobile)
  }

  console.log('Triming Background Video')
  const executeCommand = await executeFFMPEGCommand(command)

  if (executeCommand.includes('Command Failed Due')) return `${executeCommand}`

  return 'Command Executed Successfully'
}

module.exports = trimOrignalVideo
