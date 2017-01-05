/* global describe it*/

const expect = require('chai').expect
const {textProcessor} = require('./textProcessor')

describe('textProcessor', () => {
  it('should clean things up', () => {
    expect(textProcessor(' foobar ')).to.equal('foobar')
    expect(textProcessor(' foo    bar ')).to.equal('foo bar')
    expect(textProcessor(' #foo ')).to.equal('foo')
    expect(textProcessor(' foo Http://example.com')).to.equal('foo')
    expect(textProcessor(' foo Http://example.com bar')).to.equal('foo bar')
    expect(textProcessor(' foo #bar')).to.equal('foo bar')
    expect(textProcessor(' foo.')).to.equal('foo .')
  })
})
