import React from 'react'
import features from './'

@features
class Story extends React.Component {
  render () {
    return (
      <div>
        <h2>Features:</h2>
        <pre><code>
          {JSON.stringify(this.props.features, null, 2)}
        </code></pre>
      </div>
    )
  }
}

export default function ({storiesOf, action}) {
  storiesOf('Decorators', module).addWithInfo(
    'features-decorator',
    `
      An example for using the features decorator.

          @features
          class Story extends React.Component {
            render () {
              <div>
                <h2>Features:</h2>
                <pre><code>
                  {JSON.stringify(this.props.features, null, 2)}
                </code></pre>
              </div>
            }
          }
    `,
    () => (
      <Story />
    )
  )
}
