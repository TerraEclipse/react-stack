import React from 'react'
import <%= componentName %> from './'

export default function ({storiesOf, action}) {
  storiesOf('<%= componentName %>', module).addWithInfo(
    '[label here]',
    `
      [description here]
    `,
    () => (
      <<%= componentName %>/>
    )
  )
}
