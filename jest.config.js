export default {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            useESM: true,
            tsconfig: 'tsconfig.json'
        }],
        '^.+\\.(js|jsx)$': ['babel-jest', { rootMode: 'upward' }]
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^(\\.{1,2}/.*)\\.js$': '$1'
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testMatch: ['<rootDir>/src/**/__tests__/**/*.[jt]s?(x)', '<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.stories.{js,jsx,ts,tsx}',
        '!src/setupTests.ts',
        '!.history/**/*'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    testPathIgnorePatterns: ['/node_modules/', '/.history/'],
}; 