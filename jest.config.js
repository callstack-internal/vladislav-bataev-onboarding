module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest-setup.js'],  // Ensure this is included
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-native-community|@react-navigation)/)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/android/',
    '/ios/',
  ],
  testEnvironment: 'node',
  verbose: true,
}
