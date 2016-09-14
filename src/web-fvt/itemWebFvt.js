const assert = require('assert')
const webdriverio = require('webdriverio')
const uuid = require('uuid')

describe('main page', function () {
  this.timeout(30000)
  const baseUrl = `http://${process.env.SERVER_HOST || 'server'}:8080`
  const options = {
    desiredCapabilities: {
      browserName: 'chrome'
    },
    host: process.env.WEBDRIVER_HOST || 'localhost',
    port: 4444
  }
  let webdriver
  before(() => {
    webdriver = webdriverio.remote(options)
    return webdriver.init()
      .then(() => webdriver.url(baseUrl))
  })

  it('provides title', function () {
    return webdriver.getTitle()
      .then(title => assert.equal('Surfing CI-fari', title))
  })

  it('creates and deletes new item', function () {
    const name = `web-fvt-${uuid.v1()}`
    const itemRow = `div.list-group-item-heading*=${name}`
    return webdriver.click('#create')
      .then(() => webdriver.waitForVisible('#name'))
      .then(() => webdriver.setValue('#name', name))
      .then(() => webdriver.click('#save'))
      .then(() => webdriver.waitForVisible(itemRow, 1000))
      .then(() => webdriver.element(itemRow))
      .then((row) => webdriver.elementIdElement(row.value.ELEMENT, 'button'))
      .then((button) => webdriver.elementIdClick(button.value.ELEMENT))
      .then(() => webdriver.waitForVisible('button[id*=delete]'))
      .then(() => webdriver.click('button[id*=delete]'))
  })
})

