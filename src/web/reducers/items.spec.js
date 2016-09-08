/* global describe it*/
import { expect } from 'chai'
import reducer from './items.js'

describe('items reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.eql({
      items: [],
      form: {
        isValid: false,
        item: {
          name: ''
        }
      }
    }
      )
  })

  it('should handle LOAD_ITEMS', () => {
    const items = [{}]
    expect(reducer({}, {
      type: 'LOAD_ITEMS',
      items: items
    })).to.eql({
      items: items
    })
  })
})
