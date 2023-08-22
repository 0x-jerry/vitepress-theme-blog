import { Feed, type FeedOptions } from 'feed'
import fs from 'fs/promises'
import path from 'path'
import dayjs from 'dayjs'

const vitepressDir = path.join(process.cwd(), '.vitepress')

export interface RSSGenerateOption extends Omit<FeedOptions, 'id'> {
  origin: string
  articlesPathPrefix: string
  filename: string
}

export async function generateFeed(conf: RSSGenerateOption) {
  const feed = new Feed({
    id: conf.origin,
    link: conf.origin,
    favicon: conf.origin + '/favicon.ico',
    feedLinks: {
      rss2: `${conf.origin}/${conf.filename}`,
    },
    ...conf,
  })

  const joinPath = (...segments: string[]) => path.join(vitepressDir, ...segments)

  const postDir = joinPath('dist', conf.articlesPathPrefix)
  const files = await fs.readdir(postDir)

  const posts: { link: string; content: string; title: string; date: Date }[] = []

  const dateReg = /meta name="date" content="([0-9a-zA-Z.:-]+)"/
  const titleReg = /<title>(.+)?<\/title>/
  const removeHeaderReg = /<header.+<\/header>/
  for (const file of files) {
    const postTitle = file.replace(/\.html$/, '')

    const link = `${conf.origin}/${conf.articlesPathPrefix}/${postTitle}`

    const html = await fs.readFile(path.join(postDir, file), { encoding: 'utf-8' })

    const date = html.match(dateReg)?.[1] || ''

    const title = html.match(titleReg)?.[1] || ''

    posts.push({
      date: dayjs(date, 'YYYY-MM-DDTHH:mm:ss.SSS.Z').toDate(),
      link,
      content: html.replace(removeHeaderReg, ''),
      title,
    })
  }

  const generatedPosts = posts.sort((a, b) => b.date.getTime() - a.date.getTime())

  for (const post of generatedPosts.slice(0, 40)) {
    feed.addItem(post)
  }

  const rss2 = feed.rss2()

  await fs.writeFile(joinPath('dist', conf.filename), rss2)
}
