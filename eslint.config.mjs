export default tseslint.config(
  // ... the rest of your config ...
  {
    rules: {
      // turns a rule on with no configuration (i.e. uses the default configuration)
      '@typescript-eslint/array-type': 'error',
      // turns on a rule with configuration
      '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
    },
  },
);