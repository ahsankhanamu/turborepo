/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  include: [
    'apps/web/**/*.ts',
    'apps/web/**/*.tsx',
    'apps/web/**/*.js', // Add this line to include .js files
    'apps/web/**/*.jsx', // If you're using JSX, add this too
  ],
};
