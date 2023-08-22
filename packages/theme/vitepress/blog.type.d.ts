declare module '@@blog' {
  import type { ReadTimeResults } from 'reading-time'
  import type { FeedOptions } from 'feed'

  export interface ExcerptData {
    date: string
    title: string
    tags?: string[]
    license?: string
    read: ReadTimeResults
  }

  export interface BlogExcerpt {
    data: ExcerptData
    html: string
    url: string
  }

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

  export interface RSSGenerateOption extends Omit<FeedOptions, 'id'> {
    origin: string
    articlesPathPrefix: string
    filename: string
  }
}

declare module globalThis {
  import type { BlogPluginConfig } from '@@blog'

  var BLOG_CONFIG: BlogPluginConfig
}
