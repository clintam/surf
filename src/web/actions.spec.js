/* global describe it*/
const expect = require('chai').expect

import * as Actions from './'

describe('actions', () => {
  const item = {
    name: 'name'
  }
  it('updateForm', () => {
    expect(Actions.updateForm(item)).to.eql({
      type: 'UPDATE_FORM',
      item: item
    })
  })
  it('loadItems', () => {
    expect(Actions.loadItems([item])).to.eql({
      type: 'LOAD_ITEMS',
      items: [item]
    })
  })
})
