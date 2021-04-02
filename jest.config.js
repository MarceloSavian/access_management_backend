module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/**/index.ts',
    '!<rootDir>/**/*-protocols.ts',
    '!**/test/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  globalSetup: "<rootDir>/node_modules/@databases/pg-test/jest/globalSetup.js",
  globalTeardown: "<rootDir>/node_modules/@databases/pg-test/jest/globalTeardown.js"
}