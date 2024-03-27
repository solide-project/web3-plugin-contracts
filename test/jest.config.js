/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/tronscan.test.ts" // Modify this pattern according to your file naming convention
  ]
};
