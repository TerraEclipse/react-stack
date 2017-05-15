import {configure, setAddon, storiesOf, action} from '@kadira/storybook'
import infoAddon from '@kadira/react-storybook-addon-info'

// Setup addons.
setAddon(infoAddon)

// Create webpack require context for stories for all modules, and load them.
const req = require.context('../../modules', true, /\.story\.js$/)
function loadStories () {
  req.keys().forEach((filepath) => {
    req(filepath).default({storiesOf, action})
  })
}
configure(loadStories, module)
