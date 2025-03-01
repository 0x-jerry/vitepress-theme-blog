import {
  defineConfig,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
  presetIcons,
  presetAttributify,
} from 'unocss'

import { presetBrand } from '@0x-jerry/unocss-preset-brand'

export default defineConfig({
  presets: [
    presetIcons(),
    presetWind3(),
    presetAttributify(),
    presetBrand({
      brand: {
        primary: 'rose',
        gray: 'gray',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
