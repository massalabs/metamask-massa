module.exports = {
  extends: ['../../.eslintrc.js'],

  parserOptions: {
    tsconfigRootDir: __dirname,
  },

  overrides: [
    {
      files: ['snap.config.ts'],
      extends: [
        '@metamask/eslint-config-nodejs',
        '@metamask/eslint-config-typescript',
      ],
    },
    {
      files: ['*.test.ts', '*.test.tsx'],
      extends: [
        '@metamask/eslint-config-nodejs',
        '@metamask/eslint-config-typescript',
      ],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-shadow': [
          'error',
          {
            allow: ['Text'],
          },
        ],
      },
    },
  ],

  ignorePatterns: ['!.eslintrc.js', 'dist/'],
};
