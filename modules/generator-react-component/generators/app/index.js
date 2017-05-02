var path = require('path')
var Generator = require('yeoman-generator')
var _ = require('lodash')

module.exports = class extends Generator {
  initializing () {
    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'First, what is the name of your component?',
      default: 'My Component'
    }]

    return this.prompt(prompts).then((props) => {
      this.props = props
      this.props.packageName = _.kebabCase(_.deburr(this.props.projectName))
      if (this.props.packageName.slice(0, 6) !== 'react-') {
        this.props.packageName = 'react-' + this.props.packageName
      }
      this.props.scopedPackageName = '@terraeclipse/' + this.props.packageName
      this.props.componentName = _.upperFirst(_.camelCase(this.props.projectName))
      this.props.currentYear = new Date().getFullYear()
    })
  }

  prompting () {
    var prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'What is the ClassName for your component?',
      default: this.props.componentName
    }, {
      type: 'input',
      name: 'scopedPackageName',
      message: 'What will the npm package name be?',
      default: this.props.scopedPackageName
    }, {
      type: 'input',
      name: 'developerName',
      message: 'What is your name? (for copyright notice, author, etc.)',
      store: true
    }]

    return this.prompt(prompts).then((props) => {
      _.extend(this.props, props)
    })
  }

  configuring () {
    var prompts = [{
      type: 'confirm',
      name: 'createDirectory',
      message: 'Would you like to create a new directory for your project?',
      default: (path.basename(this.destinationRoot()) !== this.props.packageName)
    }]

    return this.prompt(prompts).then((props) => {
      _.extend(this.props, props)
      if (props.createDirectory) {
        this.destinationRoot(this.props.packageName)
      }
    })
  }

  writing () {
    this.log('\n')
    this.log('Creating file structure:')

    const copy = [
      ['.gitignore', '.gitignore'],
      ['CONTRIBUTING.md', 'CONTRIBUTING.md'],
      ['nwb.config.js', 'nwb.config.js']
    ]
    _.each(copy, ([src, dest]) => {
      this.fs.copy(
        this.templatePath(src),
        this.destinationPath(dest)
      )
    })

    const template = [
      ['_LICENSE', 'LICENSE'],
      ['_package.json', 'package.json'],
      ['_README.md', 'README.md'],
      ['demo/src/_index.js', 'demo/src/index.js'],
      ['src/index.js', 'src/index.js'],
      ['src/_Component.js', 'src/' + this.props.componentName + '.js'],
      ['tests/_Component-test.js', 'tests/' + this.props.componentName + '-test.js']
    ]
    _.each(template, ([src, dest]) => {
      this.fs.copyTpl(
        this.templatePath(src),
        this.destinationPath(dest),
        this.props
      )
    })
  }

  install () {
    this.log('\n')
    this.log('Installing dependencies:')
    this.yarnInstall()
  }

  end () {
    this.log('\n')
    this.log('Finished!')
  }
}
