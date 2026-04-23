// ESLint config for React Native / Expo TypeScript project.
// Extends recommended rules from React, React Native, and TypeScript.
// The CI pipeline runs this with --max-warnings 0 so warnings are treated as errors.
module.exports = {
  root: true,
  extends: [
    'expo',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // Warn on unused variables — easy to accumulate in a fast-moving project
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // Allow explicit any temporarily — tighten this as the codebase matures
    '@typescript-eslint/no-explicit-any': 'warn',
    // Console.log is fine during development but flags accidental debug logs
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  env: {
    browser: true,
    node: true,
  },
};