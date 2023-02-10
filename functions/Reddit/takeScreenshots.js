const { chromium } = require('playwright')

const takeScreenshots = async (url, filename) => {
  console.log('Taking Screenshot of this url', url)
  try {
    let browser = await chromium.launch()
    let page = await browser.newPage()
    page.setDefaultNavigationTimeout(60000)
    // page.setViewportSize({ width: 1920, height: 1080 })
    // await page.setViewportSize({ width: 1280, height: 1080 })
    // await page.screenshot({ path: `functions/Video Files/${filename}.png` })
    await page.goto(url)
    const postArea = page.locator(`[data-testid='post-container']`)

    // If more than 1 element with same ID is present
    try {
      await postArea?.screenshot({
        path: `${process.env.VIDEO_FILES_PATH}/${filename}.png`,
      })
    } catch (error) {
      const totalElement = await postArea?.count()
      console.log('More than one element detected', totalElement)

      await postArea?.nth(30).screenshot({
        path: `${process.env.VIDEO_FILES_PATH}/${filename}.png`,
      })
    }

    await browser.close()
  } catch (error) {
    console.log(error)
    console.log('unable to capture screenshot for', url)
  }
}

module.exports = takeScreenshots
