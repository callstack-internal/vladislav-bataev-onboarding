module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest-setup.js'],
  setupFiles: ['@shopify/flash-list/jestSetup'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-native-community|@react-navigation)/)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/',
  ],
  testEnvironment: 'node',
  verbose: true,
}
