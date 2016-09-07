/* global describe it*/

import React from 'react'
import { expect } from 'chai'
import ItemList from './ItemList'
import { shallow, render } from 'enzyme'

describe('<ItemList />', () => {
  it('contains N Items', () => {
    const items = [{}, {}]
    const wrapper = shallow(<ItemList items={items} actions={{}} />)
    expect(wrapper.find('Item')).to.have.length(items.length)
  })
  it('renders with list-group', () => {
    const items = [{}, {}]
    const wrapper = render(<ItemList items={items} actions={{}} />)
    expect(wrapper.find('.list-group-item').length).to.equal(items.length)
  })
})
