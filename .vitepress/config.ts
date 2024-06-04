import type { ThemeOption } from '@0x-jerry/vitepress-theme-blog'
import createBaseConfig from '../.theme/vitepress/config'
import { defineConfigWithTheme } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'

export default async () => {
  const conf = defineConfigWithTheme<ThemeOption>({
    pwa: {
      manifest: {
        name: '0x-Jerry | Blog',
        description: "0x-Jerry's Blog",
        icons: [
          {
            src: 'pwa-192x192.webp',
            sizes: '192x192'
          },
          {
            src: 'favicon.svg',
            sizes: '512x512',
            purpose: 'maskable'
          },
          {
            src: 'favicon.svg',
            sizes: '512x512',
            purpose: 'any'
          }
        ],
        theme_color: '#ffffff',
        screenshots: [
          {
            src: 'pwa-192x192.webp',
            sizes: '192x192',
            form_factor: 'wide'
          },
          {
            src: 'pwa-192x192.webp',
            sizes: '192x192',
            form_factor: 'narrow'
          }
        ]
      }
    },
    extends: await createBaseConfig(),
    title: '0x-Jerry',
    titleTemplate: ':title | Blog',
    cleanUrls: true,
    ignoreDeadLinks: true,
    themeConfig: {
      name: '0x-Jerry',
      avatar: 'https://avatars.githubusercontent.com/u/14226737?v=4',
      motto: `Life was like a box of chocolates. You never know what you're gonna get.`,
      email: 'x.jerry.wang@gmail.com',
      timezone: 'Asia/Chongqing',
      links: {
        github: 'https://github.com/0x-jerry'
      }
    }
  })

  return withPwa(conf)
}
