import { FlatCompat } from "@eslint/eslintrc";
import pluginReact from "eslint-plugin-react";
import eslint from "@eslint/js";

const compat = new FlatCompat({
  baseDirectory: __dirname, // Required for plugin resolution
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  // Apply recommended configurations via compat
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ),
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.jest },
      parser: tsEslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: 'module',
        projectService: {
          allowDefaultProject: [
            'packages',
            'declaration-files',
            'eslint.config.js',
            'graphql.config.js',
            'jest.config.js',
            'prettier.config.js',
            'stylelint.config.js',
            'packages/shared/graphql/eslint.config.js',
          ],
          defaultProject: 'tsconfig.json',
        },
        tsconfigRootDir: rootDirectory,
      },
    },
  },
  {
    rules: {
      'prettier/prettier': ['error', { singleQuote: true, endOfLine: 'auto' }],
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },

  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  {
    
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  pluginReact.configs.flat["jsx-runtime"],
  {
        rules: {
            "react/jsx-no-constructed-context-values": "off",
            "react/jsx-key": "error",
            "react/jsx-props-no-spreading": "off",
            "react/jsx-boolean-value": "off",
            "react/no-unescaped-entities": "off",
            "react/no-array-index-key": "off",
            "react/require-default-props": "off",
            "react/prefer-stateless-function": "error",
            "react/button-has-type": "error",
            "react/no-unused-prop-types": "error",
            "react/jsx-pascal-case": "error",
            "react/jsx-no-script-url": "error",
            "react/no-children-prop": "error",
            "react/no-danger": "error",
            "react/no-danger-with-children": "error",
            "react/no-unstable-nested-components": [
                "error",
                {
                    allowAsProps: true
                }
            ],
            "react/jsx-fragments": "error",
            "react/destructuring-assignment": [
                "error",
                "always",
                {
                    destructureInSignature: "always"
                }
            ],
            "react/jsx-no-leaked-render": [
                "error",
                {
                    validStrategies: ["ternary"]
                }
            ],
            "react/jsx-max-depth": [
                "error",
                {
                    max: 10
                }
            ],
            "react/function-component-definition": [
                "warn",
                {
                    namedComponents: "arrow-function"
                }
            ],
            "react/jsx-no-useless-fragment": "warn",
            "react/jsx-curly-brace-presence": "warn",
            "react/no-typos": "warn",
            "react/display-name": "warn",
            "react/self-closing-comp": "warn",
            "react/jsx-sort-props": "warn",
            "react/react-in-jsx-scope": "off",
            "react/jsx-one-expression-per-line": "off",
            "react/prop-types": "off"
        }
    },
];
