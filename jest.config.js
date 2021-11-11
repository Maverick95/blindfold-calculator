module.exports = {
    roots: ["<rootDir>/src"],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.css$": "<rootDir>/__mocks__/styleMock.js"
      },
    setupFilesAfterEnv: ['<rootDir>/__setups__/setupJest.js'],
    // Options below are temporary to fix the fact that you didn't transpile equation-stack before
    // publishing the package, like an idiot!
    transform: {'\\.[jt]sx?$': [ 'babel-jest', { configFile: './.babelrc' } ]},
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(equation\-stack)/)'],
};