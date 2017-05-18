import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

class Hover extends React.Component {
  static propTypes = {
    layer: PropTypes.string.isRequired,
    uid: PropTypes.string,
    children: PropTypes.func
  }

  static defaultProps = {
    uid: 'id'
  }

  static contextTypes = {
    map: PropTypes.object
  }

  state = {
    ids: [],
    features: []
  }

  constructor () {
    super()
    this.ids = []
    this.features = []
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
    let ids = _.map(e.features, `properties.${this.props.uid}`)
    if (_.difference(ids, this.state.ids).length) {
      this.ids = ids
      this.features = e.features
      this.setState(() => ({ids: this.ids, features: this.features}))
    }
  }

  handleMouseLeave (e) {
    this.setState(() => ({ids: [], features: []}))
  }

  render () {
    return this.props.children
      ? this.props.children({features: this.state.features})
      : null
  }
}

export default Hover
