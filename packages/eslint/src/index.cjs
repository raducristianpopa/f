/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    "next",
    "turbo",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-var": "error",
    "no-eval": "error",
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports", fixStyle: "inline-type-imports" },
    ],
    "@typescript-eslint/consistent-type-assertions": "warn",
    "@typescript-eslint/no-redeclare": "error",
    "@typescript-eslint/no-use-before-define": [
      "warn",
      {
        functions: false,
        classes: false,
        variables: false,
        typedefs: false,
      },
    ],
  },
  ignorePatterns: [
    "env.cjs",
    ".eslintrc.cjs",
    ".prettierrc.cjs",
    "**/*.config.cjs",
    "packages/tsconfig/**",
    "packages/tailwind/**",
    "packages/eslint/**",
  ],
  reportUnusedDisableDirectives: true,
};

module.exports = config;
