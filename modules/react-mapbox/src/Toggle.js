import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Children from './Children'
import Click from './Click'

class Toggle extends React.Component {
  static propTypes = {
    layer: PropTypes.string.isRequired,
    property: PropTypes.string,
    multiple: PropTypes.bool,
    clickEvent: PropTypes.string,
    avoidDoubleClick: PropTypes.bool,
    doubleClickSpeed: PropTypes.number,
    children: PropTypes.func
  }

  static defaultProps = {
    property: 'id',
    multiple: false
  }

  static contextTypes = {
    map: PropTypes.object
  }

  state = {
    features: {}
  }

  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.layer !== nextProps.layer) {
      this.setState({features: {}})
    }
    if (this.props.multiple !== nextProps.multiple) {
      if (!nextProps.multiple && !_.isEmpty(this.state.features)) {
        let key = _.keys(this.state.features).pop()
        this.setState({features: {
          [key]: this.state.features[key]
        }})
      }
    }
  }

  handleClick (e) {
    let propertyPath = `properties.${this.props.property}`
    let features = this.state.features

    if (this.props.multiple) {
      _.each(e.features, (feature) => {
        let property = _.get(feature, propertyPath)
        if (this.state.features[property]) {
          delete features[property]
        } else {
          features[property] = feature
        }
      })
    } else {
      let property = _.get(e.features[0], propertyPath)
      if (features[property]) {
        features = {}
      } else {
        features = {[property]: e.features[0]}
      }
    }

    this.setState({features})
  }

  render () {
    return (
      <Children>
        <Click
          layer={this.props.layer}
          event={this.props.clickEvent}
          avoidDoubleClick={this.props.avoidDoubleClick}
          doubleClickSpeed={this.props.doubleClickSpeed}
          onClick={this.handleClick}
        />
        {this.props.children
          ? (typeof this.props.children === 'function')
            ? this.props.children({features: _.values(this.state.features)})
            : this.props.children
          : null
        }
      </Children>
    )
  }
}

export default Toggle
