/* global describe it*/
const expect = require('chai').expect
const itemsChatUx = require('./itemsChatUx')
const Controller = require('./mockController')
const sinon = require('sinon')

describe('itemsChatUx', () => {
  it('should listen for help', () => {
    const controller = new Controller()
    const client = {
      items: () => {
        return {
          list: sinon.stub().returns(Promise.resolve([]))
        }
      }
    }
    itemsChatUx.initialize({ controller, client })
    controller.say('help')
    expect(controller.replies[0]).to.have.string('I can keep track')
  })

  // TODO test somthing that actually uses item service
})
