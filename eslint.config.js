import stellarEslint from "@stellar/eslint-config";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      stellarEslint.config,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-filename-extension": ["error", { extensions: ["js", "tsx"] }],
      "react/prop-types": "off",
      "valid-jsdoc": "off",
      "import/extensions": "off",
    },
  },
]);
