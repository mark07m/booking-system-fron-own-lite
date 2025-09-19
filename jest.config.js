const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './apps/owner',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/apps/owner/src/$1',
    '^@shared/(.*)$': '<rootDir>/apps/owner/src/shared/$1',
    '^@entities/(.*)$': '<rootDir>/apps/owner/src/entities/$1',
    '^@features/(.*)$': '<rootDir>/apps/owner/src/features/$1',
    '^@widgets/(.*)$': '<rootDir>/apps/owner/src/widgets/$1',
  },
  collectCoverageFrom: [
    'apps/owner/src/**/*.{js,jsx,ts,tsx}',
    '!apps/owner/src/**/*.d.ts',
    '!apps/owner/src/**/*.stories.{js,jsx,ts,tsx}',
    '!apps/owner/src/**/*.test.{js,jsx,ts,tsx}',
    '!apps/owner/src/**/*.spec.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: [
    '<rootDir>/apps/owner/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/apps/owner/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
