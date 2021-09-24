import { Route } from 'vite-plugin-pages'
import { Feed } from 'feed'
import { ArticleInfo } from 'virtual:blog'
import { promises as fs, existsSync } from 'fs'
import path from 'path'

interface GenerateRSSOption {
  base: string
}

export async function generateRSS(routes: Route[], opt: GenerateRSSOption) {
  const rootUri = opt.base

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
    author: {
      name: 'Jerry Wang',
      email: 'x.jerry.wang@gmail.com',
      link: rootUri,
    },
  })

  routes
    .filter((r) => r.path.startsWith('/docs/'))
    .forEach((post) => {
      const info = (post.meta as any).info as ArticleInfo

      const url = rootUri + post.path

      feed.addItem({
        title: info.title,
        id: url,
        link: url,
        description: info.excerpt,
        content: info.excerpt,
        author: [
          {
            name: 'Jerry Wang',
            email: 'x.jerry.wang@email.com',
            link: rootUri,
          },
        ],
        date: info.date,
      })
    })

  const distDir = path.join(__dirname, '..', 'dist')
  if (!existsSync(distDir)) {
    await fs.mkdir(distDir)
  }
  await fs.writeFile(path.join(distDir, 'rss.xml'), feed.rss2())
}
