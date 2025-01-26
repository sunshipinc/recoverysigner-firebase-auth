import recommended from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": typescriptEslint,
    },

    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },

    rules: {
      // Default ESLint rules
      ...recommended.rules,

      // React recommended rules
      ...react.configs.recommended.rules,

      // React hooks rules
      ...reactHooks.configs.recommended.rules,

      // TypeScript recommended rules
      ...typescriptEslint.configs.recommended.rules,
    },

    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },
];
