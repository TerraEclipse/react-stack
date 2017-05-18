import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Hover extends React.Component {
  static propTypes = {
    layer: PropTypes.string.isRequired,
    uid: PropTypes.string,
    onHoverOver: PropTypes.func,
    onHoverOut: PropTypes.func,
    children: PropTypes.func
  }

  static defaultProps = {
    uid: 'id'
  }

  static contextTypes = {
    map: PropTypes.object
  }

  state = {
    uids: [],
    features: []
  }

  constructor () {
    super()
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
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

  handleMouseMove (e) {
    let uidPath = `properties.${this.props.uid}`
    let uids = _.map(e.features, uidPath)
    let over = _.difference(uids, this.state.uids)
    let out = _.difference(this.state.uids, uids)
    if (over.length || out.length) {
      if (out.length && this.props.onHoverOut) {
        _.each(out, (uid) => {
          this.props.onHoverOut(_.find(this.state.features, [uidPath, uid]), e)
        })
      }
      if (over.length && this.props.onHoverOver) {
        _.each(over, (uid) => {
          this.props.onHoverOver(_.find(e.features, [uidPath, uid]), e)
        })
      }
      if (this.props.children) {
        this.setState({uids: uids, features: e.features})
      }
    }
  }

  handleMouseLeave (e) {
    if (this.state.uids && this.props.onHoverOut) {
      _.each(this.state.features, (feature) => {
        this.props.onHoverOut(feature, e)
      })
    }
    if (this.props.children) {
      this.setState({uids: [], features: []})
    }
  }

  render () {
    return this.props.children
      ? this.props.children({features: this.state.features})
      : null
  }
}

export default Hover
