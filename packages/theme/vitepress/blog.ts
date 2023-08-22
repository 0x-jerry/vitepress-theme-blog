import { type Plugin } from 'vite'
import { generateFeed, type RSSGenerateOption } from './rss'
import { type ContentData, createContentLoader } from 'vitepress'
import readingTime from 'reading-time'
import type { BlogExcerpt } from '@blog/excerpts'
import path from 'path'

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

const PREFIX_ID = '@blog'

const VIRTUAL_ID = {
  PREFIX: PREFIX_ID,
  EXCERPTS: PREFIX_ID + '/excerpts',
  TAGS: PREFIX_ID + '/tags',
} as const

export function createBlogPlugin(config: BlogPluginConfig): Plugin {
  let loader: {
    watch: string | string[]
    load: () => Promise<ContentData[]>
  }

  return {
    name: 'vite-plugin-blog',

    configResolved() {
      loader = createContentLoader([config.prefixPath + '/**/*.md'], {
        includeSrc: true,
        render: true,
        excerpt: '<!-- more -->',
      })
    },

    resolveId(source) {
      if (source.startsWith(VIRTUAL_ID.PREFIX)) {
        return source
      }
    },
    async load(id) {
      if (id.startsWith(VIRTUAL_ID.EXCERPTS)) {
        return await loadExcerpts()
      }
    },

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

  async function loadExcerpts() {
    const postContents = await loader.load()

    const result: BlogExcerpt[] = postContents.map((n) => {
      let html = n.excerpt || ''
      html = fixResourceUrl(html, 'src', n.url)
      // html = fixResourceUrl(html, 'href', n.url)
      return {
        html: html!,
        url: n.url,
        data: {
          ...n.frontmatter,
          title: n.frontmatter.title,
          date: n.frontmatter.date,
          read: readingTime(n.src || ''),
        },
      }
    })

    return `export default ${JSON.stringify(result)}`
  }
}

/**
 * Fix resource url in home page
 *
 * test/img.png => posts/test/img.png
 *
 * @param html raw html
 * @param attr replace attribute
 * @param fileUrl markdown file url
 * @returns
 */
function fixResourceUrl(html: string, attr: string, fileUrl: string) {
  const r = new RegExp(`${attr}="([^"]+)"`, 'g')

  return html.replaceAll(r, (src) => {
    let source = src.slice(attr.length + 2, -1)

    if (!path.isAbsolute(source)) {
      source = path.join(fileUrl, '..', source)
    }

    return `src="${source}"`
  })
}
