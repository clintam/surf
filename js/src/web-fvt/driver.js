const webdriverio = require('webdriverio')
const Page = require('./page')
const bluebird = require('bluebird')

class Driver {

  init() {
    const baseUrl = `http://${process.env.SERVER_HOST || 'server'}:8080`
    const options = {
      desiredCapabilities: {
        browserName: 'chrome'
      },
      host: process.env.WEBDRIVER_HOST || 'localhost',
      port: 4444
    }
    this.webdriver = webdriverio.remote(options)
    return this.webdriver.init()
      .then(() => this.webdriver.url(baseUrl))
      .then(() => this)
  }

  getTitle() {
    return this.webdriver.getTitle()
  }

  navigateToItems() {
    return bluebird.resolve(new Page(this.webdriver))
  }

  navigateToBots() {
    return this.webdriver.click('a#bots')
    .then(() => new Page(this.webdriver))
  }
}

module.exports = Driver
