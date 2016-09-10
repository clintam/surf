/* global describe it*/

import React from 'react'
import { expect } from 'chai'
import ItemList from './ItemList'
import { shallow } from 'enzyme'

describe('<ItemList />', () => {
  const items = [{}, {}]
  const formProvider = (item) => undefined
  const wrapper = shallow(<ItemList
    items={items}
    formProvider={formProvider}
    actions={{}} />
  )

  it('contains N Items', () => {
    expect(wrapper.find('Item')).to.have.length(items.length)
  })
})
