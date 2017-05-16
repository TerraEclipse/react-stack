/* eslint-env jest */
import throttleRAF from './'

describe('throttle-raf-decorator', () => {
  it('throws when applied to a class', () => {
    expect(() => {
      @throttleRAF
      class Foo {}
    }).toThrow(/can only be applied to class methods/)
  })

  it('throws when applied to a getter', () => {
    expect(() => {
      class Foo {
        @throttleRAF
        get bar () {}
      }
    }).toThrow(/can only be applied to class methods/)
  })

  it('throttles method calls', () => {
    const throttled = jest.fn()
    const unthrottled = jest.fn()

    class Foo {
      @throttleRAF
      throttled () {
        throttled()
      }

      unthrottled () {
        unthrottled()
      }
    }
    const foo = new Foo()

    expect(throttled).toHaveBeenCalledTimes(0)
    expect(unthrottled).toHaveBeenCalledTimes(0)
    foo.throttled()
    foo.unthrottled()
    expect(throttled).toHaveBeenCalledTimes(1)
    expect(unthrottled).toHaveBeenCalledTimes(1)
    foo.throttled()
    foo.unthrottled()
    expect(throttled).toHaveBeenCalledTimes(1)
    expect(unthrottled).toHaveBeenCalledTimes(2)
  })
})
