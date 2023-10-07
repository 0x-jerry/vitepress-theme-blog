import type { ThemeOption } from 'vitepress-theme-blog'
import createBaseConfig from 'vitepress-theme-blog/config'
import { defineConfigWithTheme } from 'vitepress'

export default async () => {
  return defineConfigWithTheme<ThemeOption>({
    title: '0x-Jerry',
    titleTemplate: ':title | Blog',
    extends: await createBaseConfig(),
    cleanUrls: true,
    ignoreDeadLinks: true,
    themeConfig: {
      name: '0x-Jerry',
      avatar: 'https://avatars.githubusercontent.com/u/14226737?v=4',
      motto: `Life was like a box of chocolates. You never know what you're gonna get.`,
      email: 'x.jerry.wang@gmail.com',
      links: {
        github: 'https://github.com/0x-jerry',
      },
    },
  })
}
