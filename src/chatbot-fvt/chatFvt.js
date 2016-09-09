const expect = require('chai').expect
const ItemClient = require('../client/itemClient')
const uuid = require('uuid')

var client = new ItemClient()

describe('chat bot', () => {
  it('FIXME NEEDS TEST', (done) => {
    expect(uuid.v1()).to.exist
    client.list()
    .then(() => done())
    .catch(done)
  })
})
