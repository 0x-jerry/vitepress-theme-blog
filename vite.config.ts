import path from 'path'
import { defineConfig } from 'vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import { createBlogPlugin } from './vite/blog'

export default defineConfig({
  // base: '/',
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],

      dts: true,

      dirs: ['src/components', 'posts'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],

      // fix folder name contain `.git`, ex: `0x-jerry.github.io`
      exclude: [/node_modules/, /\.git\//],

      // custom resolvers
      resolvers: [
        // auto import icons
        // https://github.com/antfu/unplugin-icons
        IconsResolver({
          componentPrefix: '',
          // enabledCollections: ['carbon']
        }),
      ],
    }),

    // https://github.com/antfu/unplugin-icons
    Icons(),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS(),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: false,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
      strictMessage: false
    }),
    createBlogPlugin({ prefixPath: '/posts' }),
  ],
})
