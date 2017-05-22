// @todo Once short-uuid gets is npm build act together, switch to that.
import short from '../util/short-uuid'

const translator = short()

export default function idgen () {
  return translator.new()
}
