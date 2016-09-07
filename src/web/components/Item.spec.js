/* global describe it*/

import React from 'react'
import { expect } from 'chai'
import Item from './Item'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('<Item />', () => {
  it('can delete with button click', () => {
    const item = {}
    const deleteItem = sinon.spy()
    const wrapper = shallow(<Item item={item} deleteItem={deleteItem} />)
    wrapper.find('button').simulate('click')
    expect(deleteItem).to.have.property('callCount', 1)
  })
})
