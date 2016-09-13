/* global describe it*/
const expect = require('chai').expect

import * as Actions from './actions'

describe('actions', () => {
  const item = {
    name: 'name'
  }

  it('loadItems', () => {
    expect(Actions.loadItems([item])).to.eql({
      type: 'LOAD_ITEMS',
      items: [item]
    })
  })
})
