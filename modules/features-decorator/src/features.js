import React from 'react'
import getDisplayName from 'react-display-name'

// Feature.js is bad and assumes browser environment ;)
if (process.env.BROWSER || typeof window !== 'undefined') {
  require('feature.js')
}

/**
 * Decorates a component and, on mount, sets a 'features' prob that
 * contains the results of all tests run by feature.js. Currently:
 *
 *   features.async
 *   features.addEventListener
 *   features.canvas
 *   features.classList
 *   features.cors
 *   features.contextMenu
 *   features.css3Dtransform
 *   features.cssTransform
 *   features.cssTransition
 *   features.defer
 *   features.deviceMotion
 *   features.deviceOrientation
 *   features.geolocation
 *   features.historyAPI
 *   features.placeholder
 *   features.localStorage
 *   features.matchMedia
 *   features.pictureElement
 *   features.querySelectorAll
 *   features.remUnit
 *   features.serviceWorker
 *   features.sizes
 *   features.srcset
 *   features.svg
 *   features.touch
 *   features.viewportUnit
 *   features.webGL
 */
export default function features (Component) {
  class Features extends React.Component {
    static displayName = `Features(${getDisplayName(Component)})`
    static WrappedComponent = Component

    state = {
      features: {}
    }

    componentDidMount () {
      this.setState({features: window.feature})
    }

    render () {
      return (
        <Component features={this.state.features} {...this.props} />
      )
    }
  }
  return Features
}
