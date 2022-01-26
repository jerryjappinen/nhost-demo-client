module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'standard',
    'plugin:vue/vue3-recommended',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // Use kebab-case in component templates
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],

    'no-var': ['error'],
    'prefer-const': ['error'],
    'array-bracket-spacing': ['error', 'never'],
    'brace-style': ['error', '1tbs', {
      allowSingleLine: false
    }],
    'arrow-body-style': ['error', 'always'],
    'arrow-parens': ['error', 'always'],

    // Number of consecutive blank lines allowed
    'object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: false
    }],
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 3,
        maxBOF: 2,
        maxEOF: 1
      }
    ],

    // Use spaces when declaring, not calling a method
    'space-before-function-paren': ['warn', 'always'],

    'import/no-commonjs': ['off'],
    'import/prefer-default-export': ['off'],
    'sort-imports': ['off'],
    'import/no-unresolved': ['off'],
    'import/no-namespace': ['off']


  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
