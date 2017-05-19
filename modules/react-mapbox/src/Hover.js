import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import throttleRAF from '@terraeclipse/throttle-raf-decorator'
import Children from './Children'
import LayerEvent from './LayerEvent'

class Hover extends React.Component {
  static propTypes = {
    layer: PropTypes.string.isRequired,
    uid: PropTypes.string,
    cursor: PropTypes.string,
    onHoverOver: PropTypes.func,
    onHoverOut: PropTypes.func,
    children: PropTypes.func
  }

  static defaultProps = {
    uid: 'id',
    cursor: 'pointer'
  }

  static contextTypes = {
    map: PropTypes.object
  }

  state = {
    uids: [],
    features: []
  }

  @throttleRAF
  handleMouseMove (e) {
    let uidPath = `properties.${this.props.uid}`
    let uids = _.map(e.features, uidPath)
    let over = _.difference(uids, this.state.uids)
    let out = _.difference(this.state.uids, uids)
    if (over.length || out.length) {
      if (out.length && this.props.onHoverOut) {
        _.each(out, (uid) => {
          this.props.onHoverOut(e, _.find(this.state.features, [uidPath, uid]))
        })
      }
      if (over.length && this.props.onHoverOver) {
        _.each(over, (uid) => {
          this.props.onHoverOver(e, _.find(e.features, [uidPath, uid]))
        })
      }
      if (this.props.children) {
        this.setState({uids: uids, features: e.features})
      }
      if (this.props.cursor) {
        this.context.map.getCanvas().style.cursor = this.props.cursor
      }
    }
  }

  @throttleRAF
  handleMouseLeave (e) {
    if (this.state.uids && this.props.onHoverOut) {
      _.each(this.state.features, (feature) => {
        this.props.onHoverOut(e, feature)
      })
    }
    if (this.props.children) {
      this.setState({uids: [], features: []})
    }
    if (this.props.cursor) {
      this.context.map.getCanvas().style.cursor = ''
    }
  }

  render () {
    return (
      <Children>
        <LayerEvent
          type='mousemove'
          layer={this.props.layer}
          onChange={this.handleMouseMove}
        />
        <LayerEvent
          type='mouseleave'
          layer={this.props.layer}
          onChange={this.handleMouseLeave}
        />
        {this.props.children
          ? (typeof this.props.children === 'function')
            ? this.props.children({features: this.state.features})
            : this.props.children
          : null
        }
      </Children>
    )
  }
}

export default Hover
