import assert from 'assert'

const webdriverio = require('webdriverio')

const url = 'http://server:8080/'

describe('main page', () => {
  it('should have the right title', (done) => {
    const client = webdriverio.remote({
      host: process.env.WEBDRIVER_HOST || 'localhost',
      port: 4444,
      desiredCapabilities: {
        browserName: 'chrome'
      }
    })

    client
      .init()
      .url(url)
      .getTitle()
      .then((title) => {
        assert.equal(title, 'Surfing CI-fari')
      })
      .then(done)
      .catch(done)
  })
})
