module.exports = {
  ...require('./jest-common'),
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  collectCoverageFrom: ['**/src/**/*.{js,ts,jsx,tsx}'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
    '^.+\\.jsx?$': 'esbuild-jest'
  },
  coveragePathIgnorePatterns: [],
  coverageThreshold: null
}

// module.exports = {
//   ...require('next/jest'),
//   moduleDirectories: ['node_modules', '<rootDir>/'],
//   testEnvironment: 'jest-environment-jsdom'
// }
