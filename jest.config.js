/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  moduleNameMapper: {
    '@components/(.*)$': './src/components/$1',
    '@/(.*)$': './src/$1',
    "^.+\\.(css|less|sass|scss)$": "ts-jest"
  },
  transform: {
    "^.+\\.[jt]sx?$": "ts-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(nanoid)/)"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['./src'],
  testEnvironment: 'jsdom',
};