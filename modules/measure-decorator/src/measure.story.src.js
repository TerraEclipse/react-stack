/**
 * Decorators - measure-decorator
 *
 * ## Automatically measure/re-measure a component
 *
 * Decorate any component with @measure to have its bounds and a remeasure()
 * function passed in as props. Updates when the props passed to the component
 * update.
 */
import React from 'react'
import measure from './'

@measure
class Story extends React.Component {
  render () {
    return (
      <div style={{position: 'relative', paddingBottom: '50%'}}>
        <div>Resize your browser to see this update.</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 40,
            left: 20,
            right: 20,
            bottom: 20,
            backgroundColor: 'yellow',
            padding: 30
          }}
        >
          <pre style={{color: 'blue'}}>
            {JSON.stringify(this.props.bounds, null, 2)}
          </pre>
        </div>
      </div>
    )
  }
}

export default Story
