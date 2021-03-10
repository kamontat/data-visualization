module.exports = {
  ignorePatterns: ["types/*.ts"],
  parser: `@typescript-eslint/parser`,
  plugins: ["@typescript-eslint"],
  extends: ["plugin:@typescript-eslint/recommended"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
  },
};
