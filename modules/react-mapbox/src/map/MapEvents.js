import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class MapEvents extends React.Component {
  static propTypes = {
    onResize: PropTypes.func,
    onDblClick: PropTypes.func,
    onClick: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMoveStart: PropTypes.func,
    onMove: PropTypes.func,
    onMoveEnd: PropTypes.func,
    onMouseUp: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func,
    onZoomStart: PropTypes.func,
    onZoom: PropTypes.func,
    onZoomEnd: PropTypes.func
  }

  static contextTypes = {
    map: PropTypes.object
  }

  componentDidMount () {
    let {map} = this.context
    _.each(MapEvents.propTypes, (_, prop) => {
      if (this.props[prop]) {
        map.on(this.eventName(prop), this.props[prop])
      }
    })
  }

  componentWillUnmount () {
    let {map} = this.context
    _.each(MapEvents.propTypes, (_, prop) => {
      if (this.props[prop]) {
        map.off(this.eventName(prop), this.props[prop])
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    let {map} = this.context
    _.each(MapEvents.propTypes, (_, prop) => {
      if (this.props[prop] !== nextProps[prop]) {
        if (this.props[prop]) {
          map.off(this.eventName(prop), this.props[prop])
        }
        if (nextProps[prop]) {
          map.on(this.eventName(prop), nextProps[prop])
        }
      }
    })
  }

  eventName (prop) {
    return prop.slice(2).toLowerCase()
  }

  render () {
    return null
  }
}

export default MapEvents
