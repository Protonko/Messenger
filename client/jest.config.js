module.exports = {
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  modulePaths: ['src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/?(*.)+(test).(js|ts)?(x)'],
  setupFilesAfterEnv: [
    '<rootDir>/setup-test.ts',
  ],
  unmockedModulePathPatterns: [
    'node_modules/react/',
    'node_modules/enzyme/',
  ],
  preset: 'jest-puppeteer',
  snapshotSerializers: [
    './node_modules/enzyme-to-json/serializer',
  ],
  "transform": {
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest",
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file-mock.ts',
    '\\.svg': '<rootDir>/__mocks__/svgr-mock.js'
  }
};
