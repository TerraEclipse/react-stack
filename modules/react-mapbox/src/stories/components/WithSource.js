import './WithSource.css'
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import 'prismjs/themes/prism.css'

class WithSource extends React.Component {
  static propTypes = {
    source: PropTypes.string,
    sources: PropTypes.object,
    children: PropTypes.node
  }

  componentDidMount () {
    document.body.className += ' has-storybook-with-source'
  }

  componentWillUnmount () {
    document.body.className = document.body.className.replace('has-storybook-with-source', '')
  }

  render () {
    return (
      <div className='storybook-with-source'>
        {this.props.title ? (
          <h2>{this.props.title}</h2>
        ) : null}
        {this.props.description ? (
          <h3>{this.props.description}</h3>
        ) : null}
        <div className='example'>
          {this.props.children}
        </div>
        {this.props.source ? (
          <div className='source'>
            <pre dangerouslySetInnerHTML={{__html: this.props.source}} />
          </div>
        ) : null}
        {this.props.sources ? _.map(this.props.sources, (source, name) => (
          <div key={name} className='source'>
            <h4>{name}</h4>
            <pre dangerouslySetInnerHTML={{__html: this.props.source}} />
          </div>
        )) : null}
      </div>
    )
  }
}

export default WithSource
