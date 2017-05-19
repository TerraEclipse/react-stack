import React from 'react'
import PropTypes from 'prop-types'
import IsMobileJS from 'ismobilejs'

/**
 * Provider of the isMobile context (server should use userAgent from the
 * request object, client can ignore).
 */
export default class IsMobileProvider extends React.Component {
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
    return React.Children.only(this.props.children)
  }
}
