/**
 * Decorators - track-hovering-decorator
 *
 * ## Track whether the user is hovering the decorated component.
 *
 * Adds an `isHovering` boolean prop to the component.
 */
import React from 'react'
import trackHovering from './'

const Story = trackHovering(({isHovering, handleHover}) => (
  <div {...handleHover} style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 240,
    height: 240,
    backgroundColor: isHovering ? 'pink' : 'yellow'
  }}>
    Hover Me
  </div>
))

export default Story
