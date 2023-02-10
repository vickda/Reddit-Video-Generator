const say = require('say')

const generateAudioFile = (filename, fullContent) => {
  // const savePath = `${process.env.VIDEO_FILES_PATH}/${filename}_audio.mp3`
  const savePath = `${process.env.VIDEO_FILES_PATH}/${filename}.mp3`

  return new Promise((resolve, reject) => {
    say.export(fullContent, 'Microsoft Zira Desktop', null, savePath, (err) => {
      if (err) {
        reject(err)
      }
      resolve(`Audio File created for ${filename}`)
    })
  })
}

module.exports = generateAudioFile
