import globals from "globals";
import pluginJs from "@eslint/js";
import pluginTs from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["./src/**/*.ts", "./features/**/*.ts"],
    languageOptions: {
      sourceType: "module",
    },
    parser: parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    env: { node: true },
    extends: [
      pluginTs.configs.recommended,
      pluginJs.configs.recommended,
    ],
  },
  {
    files: ["./features/step_definitions/steps.js"],
    languageOptions: { sourceType: "commonjs" },
    env: { node: true },
    globals: globals.node,
    extends: [
      pluginJs.configs.recommended,
    ],
  },
];