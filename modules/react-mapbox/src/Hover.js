import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import throttleRAF from '@terraeclipse/throttle-raf-decorator'

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

  componentDidMount () {
    this.bindListeners(this.props)
  }

  componentWillUnmount () {
    this.unbindListeners(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.layer !== nextProps.layer) {
      this.unbindListeners(this.props)
      this.bindListeners(nextProps)
    }
  }

  bindListeners (props) {
    let {map} = this.context
    map.on('mousemove', props.layer, this.handleMouseMove)
    map.on('mouseleave', props.layer, this.handleMouseLeave)
  }

  unbindListeners (props) {
    let {map} = this.context
    map.off('mousemove', props.layer, this.handleMouseMove)
    map.off('mouseleave', props.layer, this.handleMouseLeave)
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
    return this.props.children
      ? (typeof this.props.children === 'function')
        ? this.props.children({features: this.state.features})
        : React.Children.only(this.props.children)
      : null
  }
}

export default Hover
