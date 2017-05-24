/**
 * Decorators - features-decorator
 *
 * ## Adds a `features` prop to a component
 * The features are detected using `features.js`.
 */
import React from 'react'
import features from './'

@features
class Story extends React.Component {
  render () {
    return (
      <div>
        <h2>Enabled Features:</h2>
        <ul style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap'
        }}>
          {Object.keys(this.props.features).map((key) => (
            <li style={{
              listStyle: 'none',
              margin: 5,
              padding: '5px 10px',
              backgroundColor: this.props.features[key] ? 'green' : 'red',
              color: '#fff',
              flex: '1'
            }}>{key}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Story
