import type { ThemeOption } from 'vitepress-theme-blog'
import themeBaseConfig from 'vitepress-theme-blog/config'
import { defineConfigWithTheme } from 'vitepress'

export default async () => {
  return defineConfigWithTheme<ThemeOption>({
    extends: themeBaseConfig,
    themeConfig: {
      name: '0x-Jerry',
    },
  })
}
