import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import IsMobileJS from 'ismobilejs'
import getDisplayName from 'react-display-name'

/**
 * Checks if the current device is mobile and, optionally, matches
 * a list of devices. By default it just uses the device 'any'.
 *
 * Devices are strings like 'tablet', 'apple.phone', 'windows.device'.
 */
export default function isMobileDecorator (...devices) {
  function decorate (Component) {
    class IsMobile extends React.Component {
      static displayName = `isMobile(${getDisplayName(Component)})`
      static WrappedComponent = Component

      static contextTypes = {
        isMobile: PropTypes.object.isRequired
      }

      checkDevices () {
        return _.some(devices, (device) => this.context.isMobile[device])
      }

      render () {
        return (
          <Component isMobile={this.checkDevices()} {...this.props} />
        )
      }
    }
    return IsMobile
  }

  // Support using @isMobile or @isMobile(...devices)
  if (_.isString(devices[0])) {
    return decorate
  } else {
    devices = ['any']
    return decorate.apply(null, arguments)
  }
}

/**
 * Provider of the isMobile context (server should use userAgent from the
 * request object, client can ignore).
 */
export class IsMobileProvider extends React.Component {
  static propTypes = {
    userAgent: PropTypes.string,
    children: PropTypes.node
  }

  static childContextTypes = {
    isMobile: PropTypes.object
  }

  getChildContext () {
    return {
      isMobile: (typeof window !== 'undefined')
        ? new IsMobileJS.Class(this.props.userAgent)
        : new IsMobileJS(this.props.userAgent)
    }
  }

  render () {
    return this.props.children
  }
}
