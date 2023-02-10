// Imports
const createVideo = require('./createVideo')

// Express Configs
const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// All Routes
app.get('/createvideo/:device', createVideo)

app.listen(3000, () => {
  console.log('listen Started')
})
