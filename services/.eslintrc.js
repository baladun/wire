module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        "allowExpressions": true
      }
    ],
    "@typescript-eslint/member-ordering": [
      "error",
      {
        "default": [
          "private-field",
          "protected-field",
          "public-field",
          "constructor",
          "public-method",
          "protected-method",
          "private-method"
        ]
      }
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "semi": "off",
    "@typescript-eslint/semi": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "arrow-parens": ["error", "as-needed"],
    "prefer-const": "error",
    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "always"],
    "no-param-reassign": "error",
    "no-console": "error",
    "no-debugger": "error",
    "no-sparse-arrays": "error",
    "no-var": "error",
    "spaced-comment": "error",
    "keyword-spacing": "error",
    "no-trailing-spaces": "error",
    "space-before-blocks": "error",
    "no-whitespace-before-property": "error",
    "space-in-parens": "error",
    "no-constant-condition": "error",
    "no-extra-semi": "error",
    "no-undef-init": "error",
    "linebreak-style": ["error", "unix"],
    "indent": [
      "error",
      2,
      {
        "MemberExpression": 1,
        "SwitchCase": 1,
        "ignoredNodes": ["PropertyDefinition"]
      }
    ],
    "padded-blocks": [
      "error",
      {
        "blocks": "never",
        "switches": "never"
      }
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1
      }
    ],
    "newline-per-chained-call": [
      "error",
      {
        "ignoreChainWithDepth": 2
      }
    ],
    "eqeqeq": [
      "error",
      "always",
      {
        "null": "ignore"
      }
    ],
    "max-len": [
      "error",
      {
        "code": 140,
        "ignoreUrls": true,
        "ignoreStrings": true
      }
    ]
  },
};
