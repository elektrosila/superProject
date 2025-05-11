// jest.config.js
module.exports = {
    // Монорепо-проекты (main + renderer)
    projects: [
      {
        displayName: 'main',
        roots: ['<rootDir>/src/renderer/src/__tests__'],
        testEnvironment: 'node',
        transform: {
          '^.+\\.jsx?$': 'babel-jest'
        },
        moduleFileExtensions: ['js', 'jsx', 'json'],
        setupFiles: ['<rootDir>/jest.setup.js']
      },
      {
        displayName: 'renderer',
        roots: ['<rootDir>/src/renderer/src/__tests__'],
        testEnvironment: 'jest-environment-jsdom',
        transform: {
          '^.+\\.jsx?$': 'babel-jest'
        },
        moduleFileExtensions: ['js', 'jsx', 'json'],
        moduleNameMapper: {
          // всё, что заканчивается на .css/.png/.jpg → fileMock
          '\\.(css|png|jpg)$': '<rootDir>/__mocks__/fileMock.js'
        },
        setupFiles: ['<rootDir>/jest.setup.js']
      }
    ]
  };










//   <rootDir>/src/renderer/src/__tests__'