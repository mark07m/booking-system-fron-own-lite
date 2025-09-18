module.exports = {
  "*.{ts,tsx}": [
    "eslint --fix",
    "prettier --write",
  ],
  "*.{js,cjs,json,md}": [
    "prettier --write",
  ],
};
