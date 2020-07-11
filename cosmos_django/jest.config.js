module.exports = {
  preset: 'ts-jest',
  setupFiles: ["./frontend/src/mocks/localStorageMock.ts"],
  testEnvironment: 'jsdom',
  testMatch: [
    "**/*.test.ts"
  ],
};
