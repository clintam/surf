const assert = require('assert')
const uuid = require('uuid')
const Driver = require('./driver')

describe('main page', function () {
  const driver = new Driver()
  this.timeout(60000)
  before(() => {
    return driver.init()
  })

  it('provides title', function () {
    return driver.getTitle()
      .then(title => assert.equal('Sentiment Surfer', title))
  })

  it('creates and deletes new item', function () {
    const name = `web-fvt-${uuid.v1()}`
    return driver.navigateToItems()
      .then(p => p.clickCreateNew())
      .then(p => p.enterNameText(name))
      .then(p => p.clickSave())
      .then(p => p.openItem(name))
      .then(p => p.deleteItem(name))
  })

  it('creates and deletes new bot', function () {
    const name = `web-fvt-${uuid.v1()}`
    return driver.navigateToBots()
      .then(p => p.clickCreateNew())
      .then(p => p.enterNameText(name))
      .then(p => p.clickSave())
      .then(p => p.openItem(name))
      .then(p => p.deleteItem(name))
  })
})

