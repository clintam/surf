const assert = require('assert')
const uuid = require('uuid')

describe('main page', function () {
  it('provides title', function () {
    const title = browser.url('/').getTitle()
    assert.equal('Surfing CI-fari', title)
  })

  it('creates and deletes new item', function () {
    const name = `UI TEST${uuid.v1()}`
    const nameSelector = `li=${name}`
    browser.url('/')
    browser.setValue('#name', name)
    browser.waitForVisible('#create:enabled')
    browser.click('#create')
    browser.waitForVisible(nameSelector)
    browser.element(nameSelector).click('button')
  })
})

