import React from 'react'
import <%= componentName %> from './'

export default function ({storiesOf, action}) {
  storiesOf('Components', module).addWithInfo(
    '<%= componentName %>',
    `
      [description here]
    `,
    () => (
      <<%= componentName %> />
    )
  )
}
