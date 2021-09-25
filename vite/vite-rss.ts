import { Route } from 'vite-plugin-pages'
import { Feed, Author } from 'feed'
import { ArticleInfo } from 'virtual:blog'
import { promises as fs } from 'fs'
import path from 'path'
import { JSDOM } from 'jsdom'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'

interface GenerateRSSOption {
  base: string
  author: Author
}

export async function generateRSS(routes: Route[], opt: GenerateRSSOption) {
  const rootUri = opt.base
  const distDir = path.join(__dirname, '..', 'dist')

  const feed = new Feed({
    title: "0x-Jerry's Blog",
    description: 'Blog',
    id: rootUri,
    link: rootUri,
    language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    // image: "http://example.com/image.png",
    favicon: `${rootUri}/favicon.svg`,
    copyright: 'All rights reserved 2021, Jerry Wang',
    // updated: new Date(), // optional, default = today
    // generator: "awesome", // optional, default = 'Feed for Node.js'
    feedLinks: {
      json: `${rootUri}/json`,
      atom: `${rootUri}/atom`,
    },
    author: opt.author,
  })

  const p = routes.map(async (post) => {
    const info = (post.meta as any).info as ArticleInfo

    const url = rootUri + post.path

    const contentFilePath = path.join(distDir, post.path + '.html')

    const html = await fs.readFile(contentFilePath, { encoding: 'utf-8' })

    const $ = new JSDOM(html)

    const htmlContent = $.window.document.querySelector('.markdown-body')

    feed.addItem({
      title: info.title,
      date: info.date,
      id: url,
      link: url,
      description: info.excerpt,
      content: htmlContent?.outerHTML || '',
      author: [opt.author],
    })
  })

  await Promise.all(p)

  await fs.writeFile(path.join(distDir, 'rss.xml'), feed.rss2())
}

export async function generateSitemap(routes: Route[], opt: Omit<GenerateRSSOption, 'author'>) {
  // An array with your links
  const links = routes.map((r) => {
    return {
      url: opt.base + r.path,
      priority: 0.6,
    }
  })

  links.push({
    url: opt.base,
    priority: 1,
  })

  // Create a stream to write to
  const stream = new SitemapStream({ hostname: opt.base })

  // Return a promise that resolves with your XML string
  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString(),
  )

  const output = path.join(__dirname, '..', 'dist', 'sitemap.xml')
  await fs.writeFile(output, xml)
}
