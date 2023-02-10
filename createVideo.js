const getPostsFromReddit = require('./functions/Reddit/getPostsFromReddit')
const takeScreenshots = require('./functions/Reddit/takeScreenshots')
const trimOrignalVideo = require('./functions/Video Creation Scripts/trimOrignalVideo')
const generateAudioFile = require('./functions/Video Creation Scripts/generateAudioFile')
const addScreenshotsToVideo = require('./functions/Video Creation Scripts/addScreenshotsToVideo')
const getAudioDuration = require('./functions/Video Creation Scripts/getAudioDuration')
const addAudioToVideo = require('./functions/Video Creation Scripts/addAudioToVideo')
const mergeAllFiles = require('./functions/Video Creation Scripts/mergeAllFiles')
const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/createvideo/:device', async (req, resp) => {
  const { device } = req.params

  // get posts from reddit
  const posts = await getPostsFromReddit()

  // For Each Post create Screenshot & Audio Files
  for (let i = 0; i < posts.length; i++) {
    const val = posts[i]
    const url = val['data']['url']
    const filename = val['data']['created']
    const fullContent = val['data']['title'] + ' ,  ,' + val['data']['selftext']

    // Take screenshots for each posts
    await takeScreenshots(url, filename)

    // Create Speech Synthesized files
    await generateAudioFile(filename, fullContent)

    // Get Audio Duration
    const audioDuration = await getAudioDuration(filename)

    // Trim Video based on Audio File
    await trimOrignalVideo(audioDuration, device)

    // Add Audio to Video
    await addAudioToVideo(filename)

    // Add Screenshot
    await addScreenshotsToVideo(filename, device)
  }

  // To Delete All Single Files
  console.log('Deleting all Single Files')
  const fileList = fs.readdirSync('functions/Video Files')
  fileList.forEach((val) => {
    if (!val.includes('final')) {
      fs.unlink(`${process.env.VIDEO_FILES_PATH}/${val}`, (err) => {
        if (err) console.log(`file not deleted due to ${err}`)
      })
    }
  })

  // Merge all the final videos into one big video
  await mergeAllFiles()

  console.log('last log')

  resp.send('responseMsg')
})

module.exports = router
