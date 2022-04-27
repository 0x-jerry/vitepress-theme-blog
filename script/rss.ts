import { Feed } from 'feed'
import fs from 'fs/promises'
import path from 'path'
import dayjs from 'dayjs'

export const site = {
  host: 'blog.0x-jerry.icu',
  postPathPrefix: '/post',
  language: 'zh',
  title: "0x Jerry's Blob",
  description: 'Just a blog.',
  author: {
    name: 'Jerry Wang',
    email: 'x.jerry.wang@gmail.com',
    link: 'https://github.com/0x-jerry',
  },
  get baseUrl() {
    return 'https://' + site.host
  },
  url(path: string) {
    return site.baseUrl + path
  },
}

const r = (...segments: string[]) => path.join(__dirname, '..', ...segments)

export async function generateFeed() {
  const feed = new Feed({
    title: site.title,
    description: site.description,
    id: site.baseUrl,
    link: site.baseUrl,
    language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    favicon: site.url('/favicon.svg'),
    copyright: 'All rights reserved 2022, 0x-Jerry',
    feedLinks: {
      rss2: site.url('rss2.xml'),
    },
    author: site.author,
  })

  const postDir = r('dist/post')
  const files = await fs.readdir(postDir)

  const posts: { link: string; content: string; title: string; date: Date }[] = []

  const dateReg = /meta name="date" content="([0-9a-zA-Z.:\-]+)"/
  const titleReg = /<title>(.+)?<\/title>/
  for (const file of files) {
    const postTitle = file.replace(/\.html$/, '')

    const link = site.url(site.postPathPrefix + '/' + postTitle)

    const html = await fs.readFile(path.join(postDir, file), { encoding: 'utf-8' })

    const date = html.match(dateReg)?.[1] || ''

    const title = html.match(titleReg)?.[1] || ''

    posts.push({
      date: dayjs(date, 'YYYY-MM-DDTHH:mm:ss.SSS.Z').toDate(),
      link,
      content: html,
      title,
    })
  }

  const generatedPosts = posts.sort((a, b) => b.date.getTime() - a.date.getTime())

  for (const post of generatedPosts.slice(0, 40)) {
    feed.addItem(post)
  }

  const rss2 = feed.rss2()

  await fs.writeFile(r('dist/rss2.xml'), rss2)
}
