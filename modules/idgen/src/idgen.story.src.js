/**
 * Utilities - idgen
 *
 * ## Browser-compatible randomly generated id strings
 */
import React from 'react'
import idgen from './idgen'

export default () => (
  <p>
    <strong>Random ID:</strong> {idgen()}
  </p>
)
