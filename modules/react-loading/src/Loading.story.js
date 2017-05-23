import React from 'react'
import Loading from './'

export default function ({storiesOf, action}) {
  storiesOf('Components', module).addWithInfo(
    'react-loading',
    `
      Component to display a customizable loading spinner.
    `,
    () => (
      <div>
        <table width='100%' valign='middle'>
          <tbody>
            <tr>
              <td>
                Default (no props)
              </td>
              <td>
                <Loading />
              </td>
            </tr>
            <tr>
              <td>
                With a custom 'item' prop
              </td>
              <td>
                <Loading item='puppies' />
              </td>
            </tr>
            <tr>
              <td>
                With a custom 'text' prop
              </td>
              <td>
                <Loading text='Putting boulder into trebuchet' />
              </td>
            </tr>
            <tr>
              <td>
                With both
              </td>
              <td>
                <Loading text='petting' item='puppies' />
              </td>
            </tr>
            <tr>
              <td>
                With both and 'inline' prop
              </td>
              <td>
                Lorem ipsum?
                <Loading text='petting' item='puppies' inline />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  )
}
