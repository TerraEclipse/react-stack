/* eslint-env jest */
import React from 'react'
import {shallow} from 'enzyme'
import <%= componentName %> from './'

describe('<%= componentName %>', () => {
  it('renders', () => {
    let wrapper = shallow(<<%= componentName %>/>)
    expect(wrapper.text()).toEqual('<%= projectName %>')
  })
})
