module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
  ],
  // extends: [
  //   '@nuxtjs',
  //   'plugin:nuxt/recommended',
  //   "plugin:@typescript-eslint/eslint-recommended",
  //   "plugin:@typescript-eslint/recommended"
  // ],
  // add your custom rules here
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", {
      args: "after-used",
      argsIgnorePattern: "^h$"
    }]
  }
}
