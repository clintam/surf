/* global describe it*/

import React from 'react'
import { expect } from 'chai'
import Item from './Item'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('<Item />', () => {
  const item = { _id: 1 }
  const actions = {
    focusItem: sinon.spy()
  }
  const wrapper = shallow(<Item
    item={item}
    actions={actions}
    />)

  it('can focus with click', () => {
    wrapper.find('li').simulate('click', {stopPropagation: sinon.spy()})
    expect(actions.focusItem).to.have.property('callCount', 1)
  })
})
