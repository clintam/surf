/* global describe it before*/

import React from 'react'
import { expect } from 'chai'
import Item from './Item'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('<Item />', () => {
  let wrapper, item, actions

  before(() => {
    item = { _id: 1 }
    actions = {
      focusItem: sinon.spy()
    }
    wrapper = shallow(<Item
      item={item}
      isEditMode={false}
      actions={actions}
      />)
  })

  it('can focus with click', () => {
    wrapper.find('li').simulate('click', { stopPropagation: sinon.spy() })
    expect(actions.focusItem.calledOnce).to.equal(true)
  })
})
