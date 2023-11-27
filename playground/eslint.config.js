import antfu from '@antfu/eslint-config'
import unocss from '@unocss/eslint-plugin'

export default antfu(
  {
    rules: {
      'indent': [
        'error',
        2,
      ],
      'antfu/import-dedupe': 'off',
      'antfu/no-cjs-exports': 'off',
      'antfu/no-ts-export-equal': 'off',
      'no-console': 'off',
    },
  },
  unocss.configs.flat,
)
