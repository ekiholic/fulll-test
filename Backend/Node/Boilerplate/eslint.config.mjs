import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["./src/**/*.js", "./features/**/*.js"], languageOptions: {sourceType: "commonjs"}, env : { node: true,}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
];