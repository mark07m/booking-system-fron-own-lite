export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Общие правила
      "no-console": "warn",
      "no-debugger": "error",
      "no-unused-vars": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      "no-duplicate-imports": "error",
      "no-unused-expressions": "error",
      "no-useless-return": "error",
      "no-useless-concat": "error",
      "prefer-arrow-callback": "error",
      
      // React правила (базовые)
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      
      // JSX правила
      "jsx-quotes": ["error", "prefer-double"],
      "no-extra-semi": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "comma-dangle": ["error", "always-multiline"],
      "indent": ["error", 2],
      "no-trailing-spaces": "error",
      "eol-last": "error",
    },
  },
  {
    ignores: [
      "**/*.{ts,tsx}", // Игнорируем все TypeScript файлы
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "next-env.d.ts",
      "*.config.js",
      "*.config.mjs",
      "scripts/**",
      "public/**",
    ],
  },
];