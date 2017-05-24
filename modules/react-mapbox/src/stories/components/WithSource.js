import './WithSource.css'
import React from 'react'
import PropTypes from 'prop-types'
import SyntaxHighlighter, {registerLanguage} from 'react-syntax-highlighter/dist/light'
import js from 'react-syntax-highlighter/dist/languages/javascript'
import style from 'react-syntax-highlighter/dist/styles/tomorrow'

registerLanguage('javascript', js)

class WithSource extends React.Component {
  static propTypes = {
    source: PropTypes.string,
    children: PropTypes.node
  }

  componentWillMount () {
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
        <div className='source'>
          <SyntaxHighlighter
            language='javascript'
            style={style}
            lineNumberStyle={{opacity: 0.35}}
            showLineNumbers
          >
            {this.props.source}
          </SyntaxHighlighter>
        </div>
      </div>
    )
  }
}

export default WithSource
