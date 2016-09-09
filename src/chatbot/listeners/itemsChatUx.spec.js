/* global describe it*/
const expect = require('chai').expect
const sinon = require('sinon')
const itemsChatUx = require('./itemsChatUx') // FIXME how to mock?

describe('itemsChatUx', () => {
  it('should setup hears', () => {
    const controller = {
      hears: sinon.spy()
    }
    itemsChatUx.initialize(controller)
    expect(controller.hears.callCount).to.equal(3)
  })
})
