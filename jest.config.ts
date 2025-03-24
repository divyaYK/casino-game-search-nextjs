import nextJest from 'next/jest';
import type { Config } from '@jest/types';

export const customJestConfig: Config.InitialOptions = {
  testEnvironment: 'jest-environment-jsdom',
  verbose: true,
};

export const createJestConfig = nextJest({
  dir: './',
});

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      // Workaround to put our SVG mock first
      '\\.svg$': '<rootDir>/__mocks__/svg.js',
      '^@/(.*)$': '<rootDir>/src/$1',
      ...nextJestConfig.moduleNameMapper,
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  };
};

module.exports = jestConfig;
