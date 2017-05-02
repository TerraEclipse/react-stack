/* eslint-env mocha */
import {expect} from 'chai'
import {shallow} from 'enzyme'
import React from 'react'
import <%= componentName %> from 'src/<%= componentName %>'

// Tests
describe('<%= componentName %>', () => {
  it('renders', () => {
    let wrapper = shallow(<<%= componentName %>/>)
    expect(wrapper.text()).to.equal('<%= projectName %>')
  })
})
