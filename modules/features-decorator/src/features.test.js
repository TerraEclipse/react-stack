/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react'
import {mount} from 'enzyme'
import features from './'

describe('features-decorator', () => {
  it('can detect features', (done) => {
    @features
    class Foo extends React.Component {
      render () {
        return null
      }
    }
    const wrapper = mount(<Foo />)
    process.nextTick(() => {
      // Values for jsdom as of test writing.
      expect(wrapper.state('features')).toMatchObject({
        css3Dtransform: false,
        cssTransform: false,
        cssTransition: false,
        addEventListener: true,
        querySelectorAll: true,
        matchMedia: false,
        deviceMotion: false,
        deviceOrientation: false,
        contextMenu: false,
        classList: true,
        placeholder: true,
        localStorage: false,
        historyAPI: true,
        serviceWorker: false,
        viewportUnit: false,
        remUnit: false,
        canvas: false,
        svg: false,
        webGL: false,
        cors: true,
        touch: false,
        async: false,
        defer: true,
        geolocation: false,
        srcset: true,
        sizes: true,
        pictureElement: false
      })
      done()
    })
  })
})
