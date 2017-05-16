import React from 'react'
import trackHovering from './'

const Story = trackHovering(({isHovering, handleHover}) => (
  <div {...handleHover} style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
    backgroundColor: isHovering ? 'pink' : 'yellow'
  }}>
    Hover Me
  </div>
))

export default function ({storiesOf, action}) {
  storiesOf('Decorators', module).addWithInfo(
    'track-hovering-decorator',
    `
      Example usage of trackHovering.
    `,
    () => (
      <Story />
    )
  )
}
