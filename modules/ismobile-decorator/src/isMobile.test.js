/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react'
import {mount} from 'enzyme'
import isMobile, {IsMobileProvider} from './'

@isMobile
class PrintIsMobile extends React.Component {
  render () {
    return <span>{this.props.isMobile ? 'Yes' : 'No'}</span>
  }
}

describe('isMobile', () => {
  it('detects non-mobile (from env)', () => {
    let wrapper = mount(
      <IsMobileProvider>
        <PrintIsMobile />
      </IsMobileProvider>
    )
    expect(wrapper.text()).toBe('No')
  })

  it('detects mobile from user agent', () => {
    let wrapper = mount(
      <IsMobileProvider userAgent='Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>'>
        <PrintIsMobile />
      </IsMobileProvider>
    )
    expect(wrapper.text()).toBe('Yes')
  })
})
