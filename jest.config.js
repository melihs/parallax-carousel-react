module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    testMatch: [
        "<rootDir>/src/__tests__/**/*.test.[jt]s?(x)",
        "<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts'
    ],
    fakeTimers: {
        enableGlobally: true
    }
}; 