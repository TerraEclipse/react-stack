import {configure, storiesOf, action} from '@kadira/storybook'

// Create webpack require context for stories for all modules.
const req = require.context('../modules', true, /story\.js$/)

function loadStories () {
  req.keys().forEach((filepath) => {
    req(filepath).default({storiesOf, action})
  })
}

configure(loadStories, module)
