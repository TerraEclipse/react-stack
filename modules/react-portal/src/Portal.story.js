import React from 'react'
import Portal from './'

export default function ({storiesOf, action}) {
  storiesOf('Components', module).addWithInfo(
    'react-portal',
    `
      Example usage of <Portal> component.
    `,
    () => (
      <div>
        <h1>Portal</h1>
        <Portal>
          <h2>Portal Content</h2>
        </Portal>
      </div>
    )
  )
}
