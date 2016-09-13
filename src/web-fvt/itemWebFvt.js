const assert = require('assert')
const uuid = require('uuid')

describe('main page', function () {
  it('provides title', function () {
    const title = browser.url('/').getTitle()
    assert.equal('Surfing CI-fari', title)
  })

  it('creates and deletes new item', function () {
    const name = `web-fvt-${uuid.v1()}`
    const nameSelector = `li*=${name}`
    browser.url('/')
    browser.click('#create')
    browser.waitForVisible('#name')
    browser.setValue('#name', name)
    browser.click('#save')
    browser.waitForVisible(nameSelector)
    browser.click(nameSelector)
    browser.waitForVisible('button[id*=delete]')
    browser.click('button[id*=delete]')
  })
})

