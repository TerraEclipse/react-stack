import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Children from './Children'
import MapEvent from './MapEvent'

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

  render () {
    return (
      <Children>
        {_.map(MapEvents.propTypes, (_, type) => (
          this.props[type] ? (
            <MapEvent
              key={type}
              type={type.slice(2).toLowerCase()}
              onChange={this.props[type]}
            />
          ) : null
        ))}
      </Children>
    )
  }
}

export default MapEvents
