import short from 'short-uuid/dist/short-uuid'

const translator = short()

export default function idgen () {
  return translator.new()
}
