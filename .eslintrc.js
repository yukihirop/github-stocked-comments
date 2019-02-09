// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  globals: {
     "chrome": true,
     "$": true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [ 'plugin:vue/recommended' ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'vue/max-attributes-per-line': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-indent': 0,
    'vue/html-self-closing': 0,
    'vue/attribute-hyphenation': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/attributes-order': 0,
    'vue/no-v-html': 0,
    'vue/require-v-for-key': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-unused-vars': 0,
    'vue/order-in-components': 0
  }
}
