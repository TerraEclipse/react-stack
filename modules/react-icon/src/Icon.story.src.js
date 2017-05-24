/**
 * Components - react-icon
 *
 * ## Render font-awesome icons with ease.
 */
import React from 'react'
import Icon from './'

export default () => (
  <div>
    <p>
      Pencil: <Icon type='pencil' />
    </p>
    <p>
      Pencil (with additional className): <Icon type='pencil' className='foo' />
    </p>
    <p>
      Pencil (with spin): <Icon type='pencil' spin />
    </p>
  </div>
)
