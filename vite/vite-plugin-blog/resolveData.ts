import path from 'path'
import { readFileSync } from 'fs'
import matter from 'gray-matter'
import { ArticleInfo } from 'virtual:blog'

export function getArticleConfigSync(filePath: string) {
  const parsedPath = path.parse(filePath)

  const content = readFileSync(filePath, { encoding: 'utf-8' })

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
