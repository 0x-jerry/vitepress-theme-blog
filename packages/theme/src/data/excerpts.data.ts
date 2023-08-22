import path from 'path'
import readingTime from 'reading-time'
import { createContentLoader } from 'vitepress'
import type { BlogExcerpt } from '@@blog'

declare const data: BlogExcerpt[]
export { data }

const config = globalThis.BLOG_CONFIG

export default createContentLoader([config.prefixPath + '/**/*.md'], {
  excerpt: '<!-- more -->',
  render: true,
  transform(raw): BlogExcerpt[] {
    return raw.map((n) => {
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
  },
})

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
