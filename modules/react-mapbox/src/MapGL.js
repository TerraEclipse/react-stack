/**
 * A minor clean-up of react-mapbox-gl/map.
 */
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import loadMapbox from './loadMapbox'

class MapGL extends React.Component {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    accessToken: PropTypes.string.isRequired,
    bbox: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.array,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    maxBounds: PropTypes.array,
    bearing: PropTypes.number,
    pitch: PropTypes.number,
    containerStyle: PropTypes.object,
    hash: PropTypes.bool,
    preserveDrawingBuffer: PropTypes.bool,
    onResize: PropTypes.func,
    onDblClick: PropTypes.func,
    onClick: PropTypes.func,
    onLoad: PropTypes.func,
    onStyleLoad: PropTypes.func,
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
    onZoomEnd: PropTypes.func,
    scrollZoom: PropTypes.bool,
    movingMethod: PropTypes.oneOf([
      'jumpTo',
      'easeTo',
      'flyTo'
    ]),
    attributionPosition: PropTypes.oneOf([
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right'
    ]),
    interactive: PropTypes.bool,
    renderUnsupported: PropTypes.func,
    loadCSS: PropTypes.bool
  }

  static defaultProps = {
    hash: false,
    preserveDrawingBuffer: false,
    center: [
      -0.2416815,
      51.5285582
    ],
    zoom: [11],
    minZoom: 0,
    maxZoom: 20,
    bearing: 0,
    scrollZoom: true,
    movingMethod: 'flyTo',
    pitch: 0,
    attributionPosition: 'bottom-right',
    interactive: true,
    loadCSS: true
  }

  static childContextTypes = {
    map: PropTypes.object,
    mapboxgl: PropTypes.object
  }

  state = {
    unsupported: false,
    map: null,
    mapboxgl: null
  }

  getChildContext = () => ({
    map: this.state.map,
    mapboxgl: this.state.mapboxgl
  })

  componentDidMount () {
    loadMapbox({loadCSS: this.props.loadCSS})
      .then((mapboxgl) => {
        if (!this.unmounted) {
          this.setState({mapboxgl: mapboxgl})
          this.bindEvents(this.createMap(mapboxgl))
        }
      })
      .catch((err) => {
        if (!this.unmounted) {
          console.warn(err)
          this.setState({unsupported: true})
        }
      })
  }

  componentWillUnmount () {
    const {map} = this.state

    this.unmounted = true
    if (map) {
      map.off()

      // NOTE: We need to defer removing the map to after all children have unmounted
      process.nextTick(() => {
        map.remove()
      })
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (
      nextProps.children !== this.props.children ||
      nextProps.containerStyle !== this.props.containerStyle ||
      nextState.map !== this.state.map ||
      nextProps.style !== this.props.style
    )
  }

  componentWillReceiveProps (nextProps) {
    const {map} = this.state
    if (!map) {
      return null
    }

    const center = map.getCenter()
    const zoom = map.getZoom()
    const bearing = map.getBearing()

    const didZoomUpdate = (
      this.props.zoom !== nextProps.zoom &&
      nextProps.zoom !== map.getZoom()
    )

    const didCenterUpdate = (
      this.props.center !== nextProps.center &&
      (nextProps.center[0] !== map.getCenter().lng || nextProps.center[1] !== map.getCenter().lat)
    )

    const didBearingUpdate = (
      this.props.bearing !== nextProps.bearing &&
      nextProps.bearing !== map.getBearing()
    )

    if (didZoomUpdate || didCenterUpdate || didBearingUpdate) {
      map[nextProps.movingMethod]({
        zoom: didZoomUpdate ? nextProps.zoom : zoom,
        center: didCenterUpdate ? nextProps.center : center,
        bearing: didBearingUpdate ? nextProps.bearing : bearing
      })
    }

    if (!_.isEqual(this.props.bbox, nextProps.bbox)) {
      map.fitBounds(nextProps.bbox, {
        padding: nextProps.padding || 0
      })
    }

    if (!_.isEqual(this.props.style, nextProps.style)) {
      map.setStyle(nextProps.style)
    }

    return null
  }

  createMap (mapboxgl) {
    mapboxgl.accessToken = this.props.accessToken

    const map = new mapboxgl.Map({
      preserveDrawingBuffer: this.props.preserveDrawingBuffer,
      hash: this.props.hash,
      zoom: this.props.zoom,
      minZoom: this.props.minZoom,
      maxZoom: this.props.maxZoom,
      maxBounds: this.props.maxBounds,
      bearing: this.props.bearing,
      container: this.container,
      center: this.props.center,
      pitch: this.props.pitch,
      style: this.props.style,
      scrollZoom: this.props.scrollZoom,
      attributionControl: {
        position: this.props.attributionPosition
      },
      interactive: this.props.interactive
    })

    map.on('load', (...args) => {
      if (this.props.bbox) {
        map.fitBounds(this.props.bbox, {
          padding: this.props.padding || 0
        })
      }
      if (this.props.onLoad) {
        this.props.onLoad(map, ...args)
      }
      this.setState({map})
    })

    if (this.props.onStyleLoad) {
      map.on('load', (...args) => {
        this.props.onStyleLoad(map, ...args)
      })
    }

    return map
  }

  bindEvents (map) {
    const events = {
      resize: 'onResize',
      dblclick: 'onDblClick',
      click: 'onClick',
      mousemove: 'onMouseMove',
      dragstart: 'onDragStart',
      drag: 'onDrag',
      dragend: 'onDragEnd',
      mouseup: 'onMouseUp',
      move: 'onMove',
      movestart: 'onMoveStart',
      moveend: 'onMoveEnd',
      zoomstart: 'onZoomStart',
      zoom: 'onZoom',
      zoomend: 'onZoomEnd'
    }
    _.each(events, (propName, event) => {
      if (this.props[propName]) {
        map.on(event, (...args) => {
          this.props[propName](map, ...args)
        })
      }
    })
  }

  renderUnsupported () {
    return this.props.renderUnsupported ? (
      this.props.renderUnsupported()
    ) : (
      <div className='unsupported'>Your browser does not support WebGL-based maps.</div>
    )
  }

  render () {
    const {containerStyle, children} = this.props
    const {unsupported, map} = this.state
    return (
      <div
        ref={(x) => { this.container = x }}
        className={`react-mapbox--container ${this.props.className || ''}`}
        style={_.defaults(containerStyle, {position: 'relative'})}
      >
        {unsupported ? (
          this.renderUnsupported()
        ) : (
          map && children
        )}
      </div>
    )
  }
}

export default MapGL
