module.exports = {
  // roots in ./tools/test-module
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '__fixtures__'
  ],
  // collectCoverageFrom in ./tools/test-module
  // coverageDirectory in ./tools/test-module
  coveragePathIgnorePatterns: [
    '__fixtures__'
  ],
  coverageThreshold: {
    'global': {
      'branches': 60,
      'functions': 85,
      'lines': 85,
      'statements': 85
    }
  }
}
