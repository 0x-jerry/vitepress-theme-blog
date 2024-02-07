import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
  presetIcons,
} from 'unocss'

export default defineConfig({
  presets: [presetIcons(), presetUno()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
}) as any
