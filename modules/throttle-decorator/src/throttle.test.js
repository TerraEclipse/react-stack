/* eslint-env jest */
import throttle from './'

describe('throttle-decorator', () => {
  it('throws when applied to a class', () => {
    expect(() => {
      @throttle(200)
      class Foo {}
    }).toThrow(/can only be applied to class methods/)
  })

  it('throws when applied to a getter', () => {
    expect(() => {
      class Foo {
        @throttle(200)
        get bar () {}
      }
    }).toThrow(/can only be applied to class methods/)
  })

  it('throttles method calls', (done) => {
    const mock = jest.fn()

    class Foo {
      @throttle(200)
      bar () {
        mock()
      }
    }
    const foo = new Foo()

    expect(mock).toHaveBeenCalledTimes(0)
    foo.bar()
    expect(mock).toHaveBeenCalledTimes(1)
    foo.bar()
    expect(mock).toHaveBeenCalledTimes(1)
    foo.bar()

    setTimeout(() => {
      expect(mock).toHaveBeenCalledTimes(2)
      done()
    }, 220)
  })

  it('throttles method calls on trailing edge', (done) => {
    const mock = jest.fn()

    class Foo {
      @throttle(200, {leading: false})
      bar () {
        mock()
      }
    }
    const foo = new Foo()

    expect(mock).toHaveBeenCalledTimes(0)
    foo.bar()
    expect(mock).toHaveBeenCalledTimes(0)
    foo.bar()
    expect(mock).toHaveBeenCalledTimes(0)
    foo.bar()

    setTimeout(() => {
      expect(mock).toHaveBeenCalledTimes(1)
      done()
    }, 220)
  })

  it('throttles method calls on leading edge', (done) => {
    const mock = jest.fn()

    class Foo {
      @throttle(200, {trailing: false})
      bar () {
        mock()
      }
    }
    const foo = new Foo()

    expect(mock).toHaveBeenCalledTimes(0)
    foo.bar()
    expect(mock).toHaveBeenCalledTimes(1)
    foo.bar()
    expect(mock).toHaveBeenCalledTimes(1)
    foo.bar()

    setTimeout(() => {
      expect(mock).toHaveBeenCalledTimes(1)
      done()
    }, 220)
  })
})
