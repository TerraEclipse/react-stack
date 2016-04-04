import React from 'react'
import cn from 'classnames'

class Icon extends React.Component {

  static propTypes = {
    type: React.PropTypes.string,
    spin: React.PropTypes.bool,
    className: React.PropTypes.string,
    onClick: React.PropTypes.func
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
      ></i>
    )
  }
}

export default Icon
