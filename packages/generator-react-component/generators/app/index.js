var path = require('path')
var generators = require('yeoman-generator')
var _ = require('lodash')

module.exports = generators.Base.extend({
  prompting_init: function () {
    var done = this.async()

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'First, what is the name of your component?',
      default: 'My Component'
    }]

    this.prompt(prompts, function (props) {
      _.extend(this, props)
      this.packageName = _.kebabCase(_.deburr(this.projectName))
      if (this.packageName.slice(0, 6) !== 'react-') {
        this.packageName = 'react-' + this.packageName
      }
      this.scopedPackageName = '@terraeclipse/' + this.packageName
      this.componentName = _.upperFirst(_.camelCase(this.projectName))
      this.currentYear = new Date().getFullYear()
      done()
    }.bind(this))
  },

  prompting_names: function () {
    var done = this.async()

    var prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'What is the ClassName for your component?',
      default: this.componentName
    }, {
      type: 'input',
      name: 'scopedPackageName',
      message: 'What will the npm package name be?',
      default: this.scopedPackageName
    }, {
      type: 'input',
      name: 'developerName',
      message: 'What is your name? (for copyright notice, author, etc.)',
      store: true
    }]

    this.prompt(prompts, function (props) {
      _.extend(this, props)
      done()
    }.bind(this))
  },

  prompting_project: function () {
    var done = this.async()

    var prompts = [{
      type: 'confirm',
      name: 'createDirectory',
      message: 'Would you like to create a new directory for your project?',
      default: (path.basename(this.destinationRoot()) !== this.packageName)
    }]

    this.prompt(prompts, function (props) {
      _.extend(this, props)
      if (props.createDirectory) {
        this.destinationRoot(this.packageName)
      }
      done()
    }.bind(this))
  },

  writing: {
    project: function () {
      this.log('\n')
      this.log('Creating file structure:')
      this.copy('.gitignore', '.gitignore')
      this.copy('.travis.yml', '.travis.yml')
      this.copy('CONTRIBUTING.md', 'CONTRIBUTING.md')
      this.copy('nwb.config.js', 'nwb.config.js')
      this.template('_LICENSE', 'LICENSE')
      this.template('_package.json', 'package.json')
      this.template('_README.md', 'README.md')
    },
    component: function () {
      this.template('src/_Component.js', 'src/' + this.componentName + '.js')
    },
    tests: function () {
      this.template('tests/_Component-test.js', 'tests/' + this.componentName + '-test.js')
    }
  },

  install: function () {
    this.log('\n')
    this.log('Installing dependencies:')
    this.npmInstall()
  },

  end: function () {
    this.log('\n')
    this.log('Finished!')
  }
})
