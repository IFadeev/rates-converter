import type { Config } from 'jest';
import 'ts-node/register';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.[jt]sx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/tsconfig.test.json',
      },
    ],
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: ['/node_modules/', `\\.pnp\\.[^\\/]+$`],
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',
  coverageReporters: ['text'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!**/vendor/**'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  testPathIgnorePatterns: ['/node_modules/', '/tests/'],
};

export default config;
