/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  preset: 'ts-jest',
  moduleNameMapper: {
    '@components/(.*)$': './src/components/$1',
    '@/(.*)$': './src/$1',
    "^.+\\.(css|less|sass|scss)$": "ts-jest"
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['./src'],
  testEnvironment: 'jsdom',
};