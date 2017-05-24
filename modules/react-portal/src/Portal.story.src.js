/**
 * Components - react-portal
 *
 * ## Create Portals in your Components
 *
 * 'Portals' is a concept where you can render content **outside** of your
 * react component. By default the content is appended to the `<body>`, but
 * you can also attach content to other DOM nodes.
 */
import React from 'react'
import Portal from './'

export default () => (
  <div>
    <h1>Portal Example</h1>
    <p>This content is above the portal in the source.</p>
    <Portal>
      <h2 style={{
        padding: 20,
        textAlign: 'center',
        color: '#709900',
        background: 'rgba(255, 255, 255, 0.5)'
      }}>Portal content is appended to body</h2>
    </Portal>
    <p>This content is below the portal in the source.</p>
  </div>
)
