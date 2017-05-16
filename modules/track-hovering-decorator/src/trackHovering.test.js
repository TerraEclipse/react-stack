/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react'
import {mount} from 'enzyme'
import trackHovering from './'

@trackHovering
class Foo extends React.Component {
  render () {
    return (
      <div {...this.props.handleHover}>
        {this.props.isHovering ? 'over' : 'out'}
      </div>
    )
  }
}

describe('trackHovering', () => {
  it('tracks hovering', () => {
    let wrapper = mount(<Foo />)
    expect(wrapper.text()).toEqual('out')
    wrapper.simulate('mouseEnter')
    expect(wrapper.text()).toEqual('over')
    wrapper.simulate('mouseLeave')
    expect(wrapper.text()).toEqual('out')
  })
})
