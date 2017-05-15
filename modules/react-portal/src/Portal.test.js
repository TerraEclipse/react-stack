/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react'
import {mount} from 'enzyme'
import Portal from './'

// Helper to check that an element contains a portal.
function containsPortal (element, contentSelector) {
  return !!element.querySelector(`.portal > .portal-container > ${contentSelector}`)
}

// Tests
describe('Portal', () => {
  let rootNode = document.createElement('div')
  let mountOptions = {
    attachTo: rootNode
  }

  beforeAll(() => {
    document.body.appendChild(rootNode)
  })

  describe('attached to body', () => {
    let wrapper

    beforeAll(() => {
      wrapper = mount(
        <Portal>
          <div id='content' />
        </Portal>
      , mountOptions)
    })

    afterAll(() => {
      wrapper.detach()
    })

    it('appends to <body> by default', () => {
      expect(containsPortal(document.body, '#content')).toBeTruthy()
      expect(wrapper.find('#content').length).toEqual(0)
    })
  })

  describe('attached to element by id', () => {
    let wrapper

    beforeAll(() => {
      wrapper = mount(
        <div>
          <div id='target' />
          <Portal to='target'>
            <div id='content' />
          </Portal>
        </div>
      , mountOptions)
    })

    afterAll(() => {
      wrapper.detach()
    })

    it('can append to a target element by id', () => {
      expect(containsPortal(wrapper.find('#target').node, '#content')).toBeTruthy()
      expect(wrapper.find('#content').length).toEqual(0)
    })
  })

  describe('attached to a target component', () => {
    let target
    let portal

    beforeAll(() => {
      target = mount(<div id='target' />)
      portal = mount(
        <Portal to={target.instance()}>
          <div id='content' />
        </Portal>
      )
    })

    it('can append to a target component instance', () => {
      expect(containsPortal(target.node, '#content')).toBeTruthy()
      expect(portal.find('#content').length).toEqual(0)
    })
  })

  describe('attached to a ref of target', () => {
    let target
    let portal

    beforeAll(() => {
      class Target extends React.Component {
        render () {
          return (
            <div id='target'>
              <div ref='ref' className='ref' />
            </div>
          )
        }
      }
      target = mount(<Target />)
      portal = mount(
        <Portal to={target.instance()} toRef='ref'>
          <div id='content' />
        </Portal>
      )
    })

    it('can append to a ref in a target component instance', () => {
      expect(containsPortal(target.find('.ref').node, '#content')).toBeTruthy()
      expect(portal.find('#content').length).toEqual(0)
    })
  })

  describe('props changes', () => {
    it('re-renders on props updates')
    it('can be re-mounted to a new target')
  })
})
