module.exports = {
  type: 'react-component',
  babel: {
    stage: 0
  },
  build: {
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM'
    },
    global: '',
    jsNext: true,
    umd: false
  }
}
