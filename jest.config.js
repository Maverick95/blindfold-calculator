module.exports = {
    roots: ["<rootDir>/src"],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.css$": "<rootDir>/__mocks__/styleMock.js"
      }
};