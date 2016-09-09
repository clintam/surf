/* global describe it*/
const expect = require('chai').expect
const itemsChatUx = require('./itemsChatUx')
const Controller = require('./mockController')

describe('itemsChatUx', () => {
  it('should listen for help', () => {
    const controller = new Controller()
    itemsChatUx.initialize(controller)
    expect(controller.listeners.length).to.equal(3)
    controller.say('help')
    expect(controller.replies[0]).to.have.string('I can keep track')
  })

  // TODO test somthing that actually uses item service
  // Sort out how to mock (Use DI?)
})
