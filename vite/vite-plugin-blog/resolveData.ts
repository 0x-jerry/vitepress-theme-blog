import path from 'path'
import { promises as fs } from 'fs'
import matter from 'gray-matter'
import glob from 'fast-glob'
import { ArticleInfo, BlogConfig } from 'virtual:blog'

export async function getBlogData(dir: string, isDev: boolean) {
  const articles: ArticleInfo[] = []
  const cwd = path.resolve(dir)

  const files = await glob('**/*.md', { cwd })

  const allPromise = files.map(async (file) => {
    const filePath = path.join(cwd, file)

    const d = await getArticleConfig(filePath)
    d.routePath = encodeURI(file.replace(/\.md$/, ''))

    if (d.visible || isDev) {
      articles.push(d)
    }
  })

  await Promise.all(allPromise)
  articles.sort((a, b) => b.date - a.date)

  const config: BlogConfig = {
    articles: articles,
  }

  return config
}

export async function getArticleConfig(filePath: string) {
  const parsedPath = path.parse(filePath)

  const content = await fs.readFile(filePath, { encoding: 'utf-8' })

  const c = matter(content, {
    excerpt_separator: '<!-- more -->',
  })

  const articleInfo: ArticleInfo = {
    visible: true,
    title: parsedPath.name,
    routePath: '',
    date: 0,
    tags: [],
    excerpt: c.excerpt?.trim() || '',
  }

  const d = Object.assign(articleInfo, c.data)

  return d
}
