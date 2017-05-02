import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import 'font-awesome/css/font-awesome.css'

class Icon extends React.Component {

  static propTypes = {
    type: PropTypes.string,
    spin: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func
  }

  render () {
    return (
      <i
        className={cn(
          'icon',
          'fa',
          `fa-${this.props.type}`,
          this.props.className,
          {'fa-spin': this.props.spin}
        )}
        onClick={this.props.onClick}
      />
    )
  }
}

export default Icon
