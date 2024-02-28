import type { ThemeOption } from '@0x-jerry/vitepress-theme-blog'
import createBaseConfig from '@0x-jerry/vitepress-theme-blog/config'
import { defineConfigWithTheme } from 'vitepress'

export default async () => {
  return defineConfigWithTheme<ThemeOption>({
    extends: await createBaseConfig({
      pwa: {
        manifest: {
          name: '0x-Jerry | Blog',
          description: "0x-Jerry's Blog"
        }
      }
    }),
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
}
