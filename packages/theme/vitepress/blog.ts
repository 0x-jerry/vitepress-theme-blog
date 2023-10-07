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
    verbose: true,
  })

  // Index all HTML files in a directory
  await index!.addDirectory({
    path: publicPath,
  })

  // Add extra content
  // await index!.addCustomRecord({
  //   url: '/resume.pdf',
  //   content: 'Aenean lacinia bibendum nulla sed consectetur',
  //   language: 'en',
  // })

  // Get the index files in-memory
  // const { files } = await index!.getFiles()

  // Or, write the index to disk
  await index!.writeFiles({
    outputPath: path.join(publicPath, 'pagefind'),
  })
}
