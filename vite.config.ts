import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Inspect from 'vite-plugin-inspect'
import { createBlogPlugin } from 'vite-plugin-blog'
import { MdRenderOption } from 'vite-plugin-blog/src/md2vue'
import readingTime from 'reading-time'
import { generateFeed } from './script/rss'

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
        afterRead(info) {
          const id = info.path
          const postPrefix = path.join(process.cwd(), 'posts')

          if (id.startsWith(postPrefix)) {
            return {
              href:
                '/post' + id.replace(path.join(process.cwd(), 'posts'), '').replace(/\.md$/, ''),
              read: readingTime(info.content),
            }
          }
        },
        before(info) {
          const id = info.path
          const opt: MdRenderOption = {
            wrapper: 'div',
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
      markedPluginOption: {
        highlight: {
          theme: 'vitesse-light',
          highlightLines: true,
        },
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
    onFinished() {
      generateFeed()
    },
  },

  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core', 'dayjs'],
    exclude: ['vue-demi'],
  },
})
