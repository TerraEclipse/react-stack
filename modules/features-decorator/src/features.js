import React from 'react'
import getDisplayName from 'react-display-name'

// Feature.js is bad and assumes browser environment ;)
if (typeof window !== 'undefined') {
  require('feature.js')

  // Fix the webGL check (problem occured in Windows7-Chrome55)
  // @see https://github.com/viljamis/feature.js/issues/52
  window.feature.webGL = (function (el) {
    try {
      var supports = ('probablySupportsContext' in el)
        ? 'probablySupportsContext'
        : ('supportsContext' in el)
          ? 'supportsContext'
          : 'getContext'
      if (supports in el) {
        var ctx = el.getContext('webgl') || el.getContext('experimental-webgl')
        if (ctx.getParameter(ctx.STENCIL_TEST) === null) {
          return false
        }
        return el[supports]('webgl') || el[supports]('experimental-webgl')
      }
      return 'WebGLRenderingContext' in window
    } catch (err) {
      return false
    }
  })(document.createElement('canvas'))

  // If mapboxgl is on the page, add their check too.
  window.feature.mapboxgl = window.mapboxgl
    ? window.mapboxgl.supported({failIfMajorPerformanceCaveat: true})
    : false
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
