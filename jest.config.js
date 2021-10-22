  module.exports = {

    transform: {
      '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest'
    },
    transformIgnorePatterns: ["node_modules/(?!(sucrase)/)"],
    coverageDirectory: '../../coverage/libs/types',
  };