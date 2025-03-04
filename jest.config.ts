import { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/modules/**/*.controller.ts',
    'src/modules/**/*.service.ts',
    'src/modules/**/*.subscriber.ts',
    'src/common/guards/*.guard.ts',
    'src/common/strategies/*.strategy.ts'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    'src/main.ts',
    'src/app.module.ts',
    'src/modules/.*/dto/.*',
    'src/modules/.*/entities/.*',
    'src/modules/.*/interfaces/.*',
    'src/common/.*/decorators/.*',
    'src/common/.*/docs/.*',
    'src/common/.*/factories/.*',
    'src/common/.*/interfaces/.*',
    'src/common/.*/pipes/.*',
    'src/exceptions/.*',
    'src/middlewares/.*'
  ],
  coverageDirectory: './coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testEnvironment: 'node'
};

export default config;
