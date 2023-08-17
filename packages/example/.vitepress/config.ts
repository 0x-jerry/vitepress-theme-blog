import type { ThemeOption } from 'vitepress-theme-blog'
import createBaseConfig from 'vitepress-theme-blog/config'
import { defineConfigWithTheme } from 'vitepress'

export default async () => {
  return defineConfigWithTheme<ThemeOption>({
    extends: await createBaseConfig(),
    themeConfig: {
      name: '0x-Jerry',
    },
  })
}
