import React from 'react'
import Icon from './'

export default function ({storiesOf, action}) {
  storiesOf('Components', module).addWithInfo(
    'react-icon',
    `
      Example usage of <Icon> component.
    `,
    () => (
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
  )
}
