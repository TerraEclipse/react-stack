import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
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
