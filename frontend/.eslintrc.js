module.exports = {
  extends: ["@codingsans/eslint-config/typescript-recommended"],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
};
