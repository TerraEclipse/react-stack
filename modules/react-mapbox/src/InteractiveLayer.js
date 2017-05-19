import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Children, Hover, Click, Layer, Source} from './'

class InteractiveLayer extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    uid: PropTypes.string,
    source: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    sourceLayer: PropTypes.string,
    base: PropTypes.object,
    borders: PropTypes.object,
    hover: PropTypes.object,
    hoverBorder: PropTypes.object,
    active: PropTypes.object,
    activeBorder: PropTypes.object,
    activeUid: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    clickEvent: PropTypes.string,
    avoidDoubleClick: PropTypes.bool,
    doubleClickSpeed: PropTypes.number,
    onClick: PropTypes.func,
    onHoverOver: PropTypes.func,
    onHoverOut: PropTypes.func
  }

  static defaultProps = {
    uid: 'id'
  }

  render () {
    let {
      id, source, sourceLayer, uid,
      base, borders, hover, hoverBorder,
      active, activeBorder, activeUid
    } = this.props
    let sourceId = typeof source === 'string' ? source : source.id

    return (
      <Children>
        {typeof source !== 'string' ? (
          <Source {...source} />
        ) : null}

        {base ? (
          <Layer
            id={id}
            {..._.defaults({}, base, {
              source: sourceId,
              sourceLayer: sourceLayer
            })}
          />
        ) : null}

        {borders ? (
          <Layer
            id={`${id}-borders`}
            {..._.defaults({}, borders, {
              source: sourceId,
              sourceLayer: sourceLayer
            })}
            filter={base.filter}
          />
        ) : null}

        {this.props.onClick ? (
          <Click
            layer={id}
            event={this.props.clickEvent}
            avoidDoubleClick={this.props.avoidDoubleClick}
            doubleClickSpeed={this.props.doubleClickSpeed}
            onClick={this.props.onClick}
          />
        ) : null}

        {(hover || hoverBorder || this.props.onHoverOver || this.props.onHoverOut) ? (
          <Hover
            layer={id}
            uid={uid}
            onHoverOver={this.props.onHoverOver}
            onHoverOut={this.props.onHoverOut}
          >
            {({features}) => {
              let hoveredUid = features.length
                ? _.get(features[0].properties, uid)
                : ''
              return (
                <Children>
                  {hover ? (
                    <Layer
                      id={`${id}-hover`}
                      {..._.defaults({}, hover, {
                        source: sourceId,
                        sourceLayer: sourceLayer
                      })}
                      filter={base.filter
                        ? ['all', ['==', uid, hoveredUid], base.filter]
                        : ['==', uid, hoveredUid]
                      }
                    />
                  ) : null}

                  {hoverBorder ? (
                    <Layer
                      id={`${id}-hover-border`}
                      {..._.defaults({}, hoverBorder, {
                        source: sourceId,
                        sourceLayer: sourceLayer
                      })}
                      filter={base.filter
                        ? ['all', ['==', uid, hoveredUid], base.filter]
                        : ['==', uid, hoveredUid]
                      }
                    />
                  ) : null}
                </Children>
              )
            }}
          </Hover>
        ) : null}

        {active ? (
          <Layer
            id={`${id}-active`}
            {..._.defaults({}, active, {
              source: sourceId,
              sourceLayer: sourceLayer
            })}
            filter={base.filter
              ? ['all', ['==', uid, activeUid || ''], base.filter]
              : ['==', uid, activeUid || '']
            }
          />
        ) : null}

        {activeBorder ? (
          <Layer
            id={`${id}-active-border`}
            {..._.defaults({}, activeBorder, {
              source: sourceId,
              sourceLayer: sourceLayer
            })}
            filter={base.filter
              ? ['all', ['==', uid, activeUid || ''], base.filter]
              : ['==', uid, activeUid || '']
            }
          />
        ) : null}
      </Children>
    )
  }
}

export default InteractiveLayer
