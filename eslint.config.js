import eslint from '@eslint/js';
import angular from 'angular-eslint';
import boundaries from 'eslint-plugin-boundaries';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

// eslint-plugin-boundaries based on https://docs.google.com/presentation/d/1oDee5t0cy2t7wEFL9cd2d3_m5Mpj4KfXojp2lGNOiEw/edit?usp=sharing
export default tseslint.config(
  {
    files: ['**/*.ts'],
    plugins: { boundaries },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
      boundaries.configs.recommended, // all files have to belong to a type
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        // recognise both static and dynamic TS imports
        typescript: {
          alwaysTryTypes: true,
        },
      },
      'boundaries/dependency-nodes': ['import', 'dynamic-import'],
      // types setup
      'boundaries/elements': [
        {
          type: 'lib', // type name
          pattern: 'lib', // type matching pattern (file path)
        },
        {
          type: 'routes',
          pattern: 'routes/*', // recognize individual routes
          capture: ['routes'], // extract routes name into variable
        }, // eg src/app/routes/product will capture "product"
      ],
    },
    rules: {
      '@angular-eslint/sort-lifecycle-methods': 'error',
      '@angular-eslint/no-async-lifecycle-method': 'error',
      '@angular-eslint/no-lifecycle-call': 'error',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/prefer-output-readonly': 'warn',
      '@angular-eslint/directive-selector': [
        'error',
        {
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'require',
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
      ],
      '@typescript-eslint/no-empty-function': [
        'error',
        {
          allow: ['arrowFunctions'],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'none',
        },
      ],
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/unbound-method': [
        'error',
        {
          ignoreStatic: true,
        },
      ],
      'no-unused-expressions': 'error',
      'sort-imports': 'off',
      eqeqeq: 'error',
      curly: 'error',
      'no-nested-ternary': 'error',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'lib', // type lib
              allow: ['lib'], // can only import from itself (lib)
            },
            {
              from: 'routes', // type routes
              allow: [
                'lib', // can import from lib
                ['feature', { feature: '${from.feature}' }],
              ],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      eslintPluginPrettierRecommended,
    ],
  },
);
