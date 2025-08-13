import globals from "globals";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

import recommended from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],

    ignores: ["src/locales/**/*.{ts,js}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
      globals: globals.browser,
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

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "react/react-in-jsx-scope": "off",
    },

    settings: {
      react: {
        version: "19.x", // Automatically detect the React version
      },
    },
  },
]);
