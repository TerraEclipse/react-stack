/* eslint-env jest */
import idgen from './'

describe('idgen', () => {
  it('creates a id', () => {
    let id = idgen()
    expect(id).toHaveLength(22)
  })
})
