import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
  presetIcons,
} from 'unocss'

import { presetBrand } from '@0x-jerry/unocss-preset-brand'

export default defineConfig({
  presets: [
    presetIcons(),
    presetUno(),
    presetBrand({
      brand: {
        primary: 'rose',
        gray: 'gray',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
