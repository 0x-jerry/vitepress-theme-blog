import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Inspect from 'vite-plugin-inspect'
import { createBlogPlugin } from 'vite-plugin-blog'
import { MdRenderOption } from 'vite-plugin-blog/src/md2vue'

const postHrefPrefix = 'post'

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '~blog/': `${path.resolve(__dirname, '.blog')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue'],
      pagesDir: [
        'src/pages',
        {
          dir: '.blog/posts',
          baseRoute: postHrefPrefix,
        },
      ],
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

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

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
      registerType: 'prompt',
      manifest: {
        name: "0x-Jerry's Blog",
        short_name: 'Blog',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

    // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),

    // https://github.com/antfu/vite-plugin-inspect
    Inspect({
      // change this to enable inspect for debugging
      enabled: false,
    }),

    // ViteFixResource,
    createBlogPlugin({
      postHrefPrefix: '/' + postHrefPrefix,
      changeTagMap: {
        a: 'v-link',
      },
      transform: {
        before(info) {
          const id = info.path
          const opt: MdRenderOption = {
            wrapper: 'div',
            extra: {},
          }

          if (/notes/.test(id)) {
            opt.wrapper = 'v-note'
          }

          if (/posts/.test(id)) {
            opt.wrapper = 'v-post'
          }

          if (/events/.test(id)) {
            opt.wrapper = 'v-timeline-item'
          }

          if (info.type === 'excerpt') {
            opt.wrapper = 'v-excerpt'
            opt.extra!.href =
              '/post' + id.replace(path.join(process.cwd(), 'posts'), '').replace(/\.md$/, '')
          }

          return opt
        },
      },
      async onAfterBuild(ctx) {
        await ctx.generateImportAll({
          filePattern: 'notes/**/*.md',
          filename: 'notes.ts',
        })

        await ctx.generateImportAll({
          filePattern: 'events/**/*.md',
          filename: 'events.ts',
        })
      },
    }),
  ],

  server: {
    fs: {
      strict: true,
    },
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },

  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core', 'dayjs'],
    exclude: ['vue-demi'],
  },
})
