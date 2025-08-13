import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";
import jsDoc from "eslint-plugin-jsdoc";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["src/locales/**/*.{ts,js}"],
    extends: [
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      jsdoc: jsDoc,
      react: reactPlugin,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      // OFF
      "class-methods-use-this": "off",
      "import/extensions": "off",
      "import/no-extraneous-dependencies": "off",
      "import/prefer-default-export": "off",
      "jsdoc/check-indentation": "off",
      "jsx-a11y/label-has-for": "off",
      "jsx-a11y/heading-has-content": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "linebreak-style": "off",
      "lines-between-class-members": "off",
      "no-underscore-dangle": "off",
      "no-use-before-define": "off",
      "no-prototype-builtins": "off",
      "prefer-arrow/prefer-arrow-functions": "off",
      "prefer-destructuring": "off",
      "react/forbid-prop-types": "off",
      "react/jsx-indent": "off",
      "react/no-did-mount-set-state": "off",
      "react/no-did-update-set-state": "off",
      "react/require-default-props": "off",
      "react/jsx-one-expression-per-line": "off",
      "react/destructuring-assignment": "off",
      "react/jsx-wrap-multilines": "off",
      "react/jsx-props-no-spreading": "off",
      "react/prop-types": "off",

      // WARN
      "prefer-object-spread": "warn",
      "no-debugger": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unused-prop-types": "warn",
      "react/no-array-index-key": "warn",
      "react/sort-comp": "warn",
      "react/default-props-match-prop-types": "warn",
      "react/prefer-stateless-function": "warn",
      "react/no-unused-state": "warn",
      "react/jsx-curly-brace-presence": "warn",
      "arrow-body-style": "warn",
      "prefer-const": "warn",
      "import/first": "warn",
      "import/order": "warn",
      "object-shorthand": "warn",
      "react/no-access-state-in-setstate": "warn",
      "require-await": "warn",

      // ERROR
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight", "to"],
          aspects: ["noHref", "invalidHref", "preferButton"],
        },
      ],
      "no-unused-expressions": "off",
      "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],

      "no-void": ["error"],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
]);
