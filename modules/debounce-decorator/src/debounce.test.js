/* eslint-env jest */
import debounce from './'

describe('debounce-decorator', () => {
  it('throws when applied to a class', () => {
    expect(() => {
      @debounce(200)
      class Foo {}
    }).toThrow(/can only be applied to class methods/)
  })

  it('throws when applied to a getter', () => {
    expect(() => {
      class Foo {
        @debounce(200)
        get bar () {}
      }
    }).toThrow(/can only be applied to class methods/)
  })

  it('debounces method calls', (done) => {
    const mock = jest.fn()

    class Foo {
      @debounce(200)
      bar () {
        mock()
      }
    }
    const foo = new Foo()

    expect(mock).toHaveBeenCalledTimes(0)
    foo.bar()
    foo.bar()
    foo.bar()
    expect(mock).toHaveBeenCalledTimes(0)

    setTimeout(() => {
      expect(mock).toHaveBeenCalledTimes(1)
      done()
    }, 220)
  })

  it('debounces method calls with {leading: true}', (done) => {
    const mock = jest.fn()

    class Foo {
      @debounce(200, {leading: true})
      bar () {
        mock()
      }
    }
    const foo = new Foo()

    expect(mock).toHaveBeenCalledTimes(0)
    foo.bar()
    foo.bar()
    foo.bar()
    expect(mock).toHaveBeenCalledTimes(1)

    setTimeout(() => {
      expect(mock).toHaveBeenCalledTimes(2)
      done()
    }, 220)
  })
})
