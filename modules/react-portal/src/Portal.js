import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Portal extends React.Component {

  static propTypes = {
    to: PropTypes.any,
    toRef: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
  }

  mountPortal (to, toRef) {
    let target = this.resolveTarget(to, toRef)
    this.portal = document.createElement('div')
    this.portal.className = 'portal'
    if (this.props.className) {
      this.portal.className += ` ${this.props.className}-portal`
    }
    if (this.props.to == null) {
      this.portal.style.display = 'block'
    } else {
      this.portal.style.display = 'inline-block'
    }
    target.appendChild(this.portal)
    this.renderPortal()
  }

  unmountPortal (to, toRef) {
    let target
    target = this.resolveTarget(to, toRef)
    ReactDOM.unmountComponentAtNode(this.portal)
    this.component = null
    if (target != null) {
      target.removeChild(this.portal)
    }
    this.portal = null
  }

  componentDidMount () {
    this.mountPortal(this.props.to, this.props.toRef)
  }

  componentWillUnmount () {
    this.unmountPortal(this.props.to, this.props.toRef)
  }

  resolveTarget (to, toRef) {
    let el
    if (to != null) {
      if (typeof to === 'string') {
        el = document.getElementById(to)
        if (el == null) {
          throw new Error(`Could not find portal with id ${to}!`)
        }
        return el
      } else {
        if (toRef) {
          return ReactDOM.findDOMNode(to.refs[toRef])
        } else {
          return ReactDOM.findDOMNode(to)
        }
      }
    } else {
      return document.body
    }
  }

  renderPortal () {
    this.component = ReactDOM.unstable_renderSubtreeIntoContainer(this, (
      <div className='portal-container'>
        {this.props.children}
      </div>
    ), this.portal)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.to === this.props.to) {
      this.renderPortal()
    } else {
      this.unmountPortal(prevProps.to, prevProps.toRef)
      this.mountPortal(this.props.to, this.props.toRef)
    }
  }

  render () {
    return null
  }
}

export default Portal
