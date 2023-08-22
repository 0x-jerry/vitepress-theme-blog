import { type Plugin } from 'vite'
import { generateFeed, type RSSGenerateOption } from './rss'

export interface BlogPluginConfig {
  /**
   * @default posts
   */
  prefixPath: string

  /**
   * rss config
   */
  rss?: Omit<RSSGenerateOption, 'articlesPathPrefix' | 'filename'>
}

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
