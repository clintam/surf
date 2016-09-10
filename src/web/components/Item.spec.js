/* global describe it*/

import React from 'react'
import { expect } from 'chai'
import Item from './Item'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('<Item />', () => {
  const item = { _id: 1 }
  const deleteItem = sinon.spy()
  const updateItem = sinon.spy()
  const focus = sinon.spy
  const isFocused = true
  const wrapper = shallow(<Item
    item={item}
    deleteItem={deleteItem}
    updateItem={updateItem}
    isFocused={isFocused}
    focus={focus}
    />)

  it('can delete with button click', () => {
    wrapper.find('#delete-1').simulate('click')
    expect(deleteItem).to.have.property('callCount', 1)
  })

  it('can update color with button click', () => {
    wrapper.find('#update-1').simulate('click')
    expect(updateItem).to.have.property('callCount', 1)
  })
})
