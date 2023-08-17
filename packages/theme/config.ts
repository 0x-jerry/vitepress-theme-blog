import path from 'path'
import Icons from 'unplugin-icons/vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import { defineConfig } from 'vitepress'
import { createBlogPlugin } from './vite/blog'
import { fileURLToPath } from 'url'
import { highlight } from './vite/highlight'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default async () =>
  defineConfig({
    vite: {
      plugins: [
        // https://github.com/antfu/unplugin-icons
        Icons(),

        // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
        VueI18n({
          runtimeOnly: false,
          compositionOnly: true,
          include: [path.resolve(__dirname, 'locales/**')],
          strictMessage: false,
        }),

        createBlogPlugin({ prefixPath: '/posts' }),
      ],
    },
    markdown: {
      highlight: await highlight(),
    },
  })
