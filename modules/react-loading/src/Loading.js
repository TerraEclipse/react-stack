import './Loading.css'
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Icon from '@terraeclipse/react-icon'

class Loading extends React.Component {

  static propTypes = {
    item: PropTypes.string,
    text: PropTypes.string,
    inline: PropTypes.bool
  }

  static defaultProps = {
    item: '',
    text: '',
    inline: false
  }

  render () {
    let {item, text, inline} = this.props
    return (
      <div className={cn('react-loading', {'react-loading--inline': inline})}>
        <Icon type='circle-o-notch' className='fa-spin' />
        {(item.length || text.length) ? (
          <div className='react-loading--text'>
            {`${text.length ? text : 'Loading'}${item.length ? ' ' : ''}${item}...`}
          </div>
        ) : null}
      </div>
    )
  }
}

export default Loading
