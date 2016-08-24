import assert from 'assert'

describe('main page', () => {
  it('should have the right title', () => {
    browser.url('/')
    const title = browser.getTitle()
    assert.equal(title, 'Surfing CI-fari')
  })
})
