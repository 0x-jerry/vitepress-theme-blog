import type { ThemeOption } from 'vitepress-theme-blog'
import createBaseConfig from 'vitepress-theme-blog/config'
import { defineConfigWithTheme } from 'vitepress'

export default async () => {
  return defineConfigWithTheme<ThemeOption>({
    extends: await createBaseConfig(),
    cleanUrls: true,
    ignoreDeadLinks: true,
    themeConfig: {
      name: '0x-Jerry',
    },
  })
}
