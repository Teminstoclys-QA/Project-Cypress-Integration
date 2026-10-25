import js from '@eslint/js';
import pluginCypress from 'eslint-plugin-cypress';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'node_modules/',
      'reports/',
      'allure-results/',
      'allure-report/',
      'allure-history/',
      'cypress/screenshots/',
      'cypress/downloads/',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['cypress/**/*.ts'],
    ...pluginCypress.configs.recommended,
    rules: {
      ...pluginCypress.configs.recommended.rules,
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/no-force': 'warn',
      // Usado onde o fluxo do cenário garante o valor (ex.: usuário criado no passo Dado).
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
    },
  },
);
