module.exports = {
  'parserOptions': {
    'ecmaVersion': 2018,
  },
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'plugins': [ 'node' ],
  'rules': {
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var', 'if', 'switch', 'break'], next: '*'},
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']},
      { blankLine: 'always', prev: ['export'], next: '*' },
      { blankLine: 'any', prev: ['export'], next: ['export']},
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'switch-colon-spacing': ['error', {'after': true, 'before': false}],
    'block-spacing': 'error',
    'lines-between-class-members': ['error', 'always'],
    'indent': ['error', 2, { 'VariableDeclarator': { 'var': 2, 'let': 2, 'const': 3 } }],
    'strict': 0,
    'semi': ["error", "never"],
    'keyword-spacing': ['error', {
      'before': true,
      'after': true
    }],
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'quotes': [1, 'single'],
    'object-curly-spacing': [2, 'always'],
    'no-undef': ['error', { 'typeof': true }],
    'no-global-assign': ['error'],
    'no-restricted-globals': [
      'error',
      { 'name': 'event', 'message': 'Use local parameter instead.' },
      { 'name': 'confirm', 'message': 'Use window.confirm instead.' },
      { 'name': 'alert', 'message': 'Use window.alert instead.' }
    ],
    'prefer-const': [2],
  },
};

