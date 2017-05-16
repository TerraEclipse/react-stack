import React from 'react'
import measure from './'

@measure
class Story extends React.Component {
  render () {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 50,
          left: 50,
          right: 50,
          bottom: 50,
          backgroundColor: 'yellow',
          padding: 50
        }}
      >
        <pre style={{color: 'blue'}}>
          {JSON.stringify(this.props.bounds, null, 2)}
        </pre>
      </div>
    )
  }
}

export default function ({storiesOf, action}) {
  storiesOf('Decorators', module).addWithInfo(
    'measure-decorator',
    `
      Decorate any component with @measure to have its bounds and a remeasure()
      function passed in as props. Updates when the props passed to the component
      update.
    `,
    () => (
      <Story />
    )
  )
}
