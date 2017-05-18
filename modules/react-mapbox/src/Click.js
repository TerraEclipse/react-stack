import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Click extends React.Component {
  static propTypes = {
    layer: PropTypes.string,
    event: PropTypes.string,
    avoidDoubleClick: PropTypes.bool,
    doubleClickSpeed: PropTypes.number,
    onClick: PropTypes.func,
    children: PropTypes.func
  }

  static defaultProps = {
    event: 'click',
    avoidDoubleClick: false,
    doubleClickSpeed: 300
  }

  static contextTypes = {
    map: PropTypes.object
  }

  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
  }

  componentDidMount () {
    this.bindListeners(this.props)
  }

  componentWillUnmount () {
    this.unbindListeners(this.props)
  }

  componentWillReceiveProps (nextProps) {
    let pick = ['layer', 'event', 'avoidDoubleClick', 'doubleClickSpeed']
    if (!_.isEqual(
      _.pick(this.props, pick),
      _.pick(nextProps, pick)
    )) {
      this.unbindListeners(this.props)
      this.bindListeners(nextProps)
    }
  }

  bindListeners (props) {
    let {map} = this.context
    if (props.layer) {
      map.on(props.event, props.layer, this.handleClick)
    } else {
      map.on(props.event, this.handleClick)
    }
    if (props.avoidDoubleClick) {
      map.on('dblclick', this.handleDoubleClick)
    }
  }

  unbindListeners (props) {
    let {map} = this.context
    if (props.layer) {
      map.off(props.event, props.layer, this.handleClick)
    } else {
      map.off(props.event, this.handleClick)
    }
    if (props.avoidDoubleClick) {
      clearTimeout(this._doubleClickTimeout)
      map.off('dblclick', this.handleDoubleClick)
    }
  }

  handleClick (e) {
    if (this.props.onClick) {
      if (this.props.avoidDoubleClick) {
        clearTimeout(this._doubleClickTimeout)
        this._doubleClickTimeout = setTimeout(() => {
          this.props.onClick(e, e.features)
        }, this.props.doubleClickSpeed)
      } else {
        this.props.onClick(e, e.features)
      }
    }
  }

  handleDoubleClick (e) {
    clearTimeout(this._doubleClickTimeout)
  }

  render () {
    return this.props.children
      ? React.Children.only(this.props.children)
      : null
  }
}

export default Click
