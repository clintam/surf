/* global describe it*/
import { expect } from 'chai'
import reducer from './itemsReducers'

describe('items reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}).items
    ).to.eql({
      items: []
    }
      )
  })

  it('should handle LOAD_ITEMS', () => {
    const items = [{ _id: 'abc' }]
    expect(reducer({}, {
      type: 'LOAD_ITEMS',
      items: items
    })).to.eql({
      items: {
        items,
        form: undefined
      }
    })
  })
})
