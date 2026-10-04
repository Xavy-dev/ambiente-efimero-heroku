const js = require("@eslint/js");

module.exports = [
  {
    ignores: ["node_modules/**", "coverage/**"],
  },

  js.configs.recommended,

  {
    files: ["js/filtros.js", "tests/filtros.test.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",

      globals: {
        require: "readonly",
        module: "readonly",
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
      },
    },

    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-var": "error",
      eqeqeq: "error",
      semi: ["error", "always"],
    },
  },
];
