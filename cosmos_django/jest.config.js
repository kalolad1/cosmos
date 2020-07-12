const FIXTURES_PATH = './frontend/src/fixtures/';

module.exports = {
  preset: 'ts-jest',
  setupFiles: [
      FIXTURES_PATH + "localStorageMock.ts",
      FIXTURES_PATH + "testModels.ts",
      FIXTURES_PATH + "setTimezone.ts"
  ],
  testEnvironment: 'jsdom',
  testMatch: [
    "**/*.test.ts"
  ],
};
