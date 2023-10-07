import { generateFeed, type RSSGenerateOption } from './rss'
import path from 'path'
import * as pagefind from 'pagefind'
import type { SiteConfig } from 'vitepress'

export interface BlogPluginConfig {
  /**
   * @default posts
   */
  prefixPath: string

  /**
   * rss config
   */
  rss?: Omit<RSSGenerateOption, 'articlesPathPrefix' | 'filename'>

  /**
   * default is true
   */
  search?: boolean
}

export async function postBlogGenerate(config: BlogPluginConfig, vitepress: SiteConfig) {
  if (config.search) {
    const outDir = path.join(vitepress.root, '.vitepress', 'dist')
    await buildSearchIndex(outDir)
  }

  if (config.rss) {
    await generateFeed({
      ...config.rss,
      articlesPathPrefix: config.prefixPath,
      filename: 'rss.xml',
    })
  }
}

async function buildSearchIndex(publicPath: string) {
  // Create a Pagefind search index to work with
  const { index } = await pagefind.createIndex({
    forceLanguage: 'zh',
    excludeSelectors: ['.sidebar'],
    logfile: path.join(publicPath, 'seaerch-debug.log'),
  })

  // Index all HTML files in a directory
  await index!.addDirectory({
    path: publicPath,
  })

  // write the index to disk
  await index!.writeFiles({
    outputPath: path.join(publicPath, 'pagefind'),
  })
}
