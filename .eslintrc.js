module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'prettier',
  ],
  rules: {
    'no-undef': 'off',
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
}
