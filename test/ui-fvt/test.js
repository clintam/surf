var assert = require('assert')

describe('main page', function () {
  it('should have the right title', function () {
    browser.url('/')
    var title = browser.getTitle()
    assert.equal(title, 'Surfing CI-fari')
  })
})
