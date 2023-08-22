import { type Plugin } from 'vite'
import { generateFeed } from './rss'
import type { BlogPluginConfig } from '@@blog'

export function createBlogPlugin(config: BlogPluginConfig): Plugin {
  globalThis.BLOG_CONFIG = config

  return {
    name: 'vite-plugin-blog',

    async buildEnd() {
      if (!config.rss) {
        return
      }

      await generateFeed({
        ...config.rss,
        articlesPathPrefix: config.prefixPath,
        filename: 'rss.xml',
      })
    },
  }
}
