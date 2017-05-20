import React from 'react'

export default function Overlay (props) {
  return (
    <div style={{
      position: 'fixed',
      top: 20,
      left: 20,
      padding: 5,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
      zIndex: 10
    }}>
      {props.children}
    </div>
  )
}
