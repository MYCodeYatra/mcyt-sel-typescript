/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  testTimeout: 60000,
  verbose: true,
  // Enable parallel execution (max 3 workers to prevent memory overload locally)
  maxWorkers: 3,
};
