import pluginVue from 'eslint-plugin-vue'
import pluginStorybook from 'eslint-plugin-storybook'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue,js,jsx,cjs,mjs}']
  },
  {
    ignores: ['dist/**', 'storybook-static/**', 'node_modules/**', 'src/api/**']
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  ...pluginStorybook.configs['flat/recommended'],
  skipFormatting,
  {
    rules: {
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/padding-line-between-tags': [
        'error',
        [
          { blankLine: 'always', prev: '*', next: '*' },
          { blankLine: 'never', prev: 'b', next: '*' },
          { blankLine: 'consistent', prev: 'span', next: '*' },
          { blankLine: 'consistent', prev: '*', next: 'span' }
        ]
      ]
    }
  }
)
