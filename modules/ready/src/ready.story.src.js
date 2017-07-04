/**
 * Utilities - ready
 *
 * ## Helper to respond with the DOM is ready for manipulation.
 */
import React from 'react'
import ready from './'

let text = 'NOT READY'

ready(() => {
  text = 'READY'
})

export default () => (
  <div>
    Status: {text}
  </div>
)
