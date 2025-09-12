import js from "@eslint/js"
import path from "path"
import globals from "globals"
import tseslint from "typescript-eslint"
import pluginVue from "eslint-plugin-vue"
import { defineConfig } from "eslint/config"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.strictTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,
  ...pluginVue.configs["flat/essential"],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.resolve(__dirname),
        extraFileExtensions: [".vue"],
      }
    }
  },
  { 
    files: ["**/*.vue"], 
    languageOptions: { 
      parserOptions: { 
        parser: tseslint.parser
      } 
    } 
  },
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser },
    rules: {
      quotes: ["error", "double"],
      semi: ["error", "never"],
      indent: ["error", 2, { SwitchCase: 1 }],
      camelcase: ["error", { 
        "properties": "never",
        "ignoreDestructuring": true,
        "allow": ["^[A-Z][A-Z_]*$"]
      }],
      "prefer-const": "error",
      "vue/multi-word-component-names": "off",
      "no-unused-vars": "off",
    }
  },
])
