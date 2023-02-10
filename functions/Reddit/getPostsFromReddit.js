require('dotenv').config()
const fs = require('fs')
const fetch = require('node-fetch')

const loginReddit = async () => {
  // Generate Auth Token
  // const { access_token } = await getAuthToken()
  // const redditPosts = await getContent(access_token, 'dadjokes')

  const redditPosts = await JSON.parse(fs.readFileSync('data.json', 'utf8'))

  console.log('reddit post count => ' + redditPosts.length)

  return redditPosts
}

// Generate Auth Token
const getAuthToken = () => {
  const userName = process.env.REDDIT_USERNAME
  const password = process.env.REDDIT_PASSWORD
  const clientID = process.env.REDDIT_CLIENT_ID
  const secret = process.env.REDDIT_SECRETKEY
  const authKey = Buffer.from(clientID + ':' + secret).toString('base64')

  return fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    body: `grant_type=password&username=${userName}&password=${password}`,
    headers: {
      Authorization: `Basic ${authKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.error('Error:', error)
    })
}

// Get Content

const getContent = (access_token, subreddit) => {
  // 'https://www.reddit.com/api/v1/access_token'
  return fetch(`https://oauth.reddit.com/r/${subreddit}/new`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${access_token}`,
      'User-Agent': 'test script v0.1',
    },
  })
    .then((response) => response.json())
    .then((result) => result['data']['children'])
    .catch((error) => {
      console.error('Error:', error)
    })
}

module.exports = loginReddit
