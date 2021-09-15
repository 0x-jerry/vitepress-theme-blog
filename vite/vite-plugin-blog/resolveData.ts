import path from 'path'
import { promises as fs } from 'fs'
import matter from 'gray-matter'
import { ArticleInfo } from 'virtual:blog'
import { Route } from 'vite-plugin-pages'

interface ArticleCacheInfo extends ArticleInfo {
  ms: number
}

const cache = new Map<string, ArticleCacheInfo>()

async function getArticleConfigSync(filePath: string) {
  const parsedPath = path.parse(filePath)
  const stat = await fs.stat(filePath)

  const hit = cache.get(filePath)

  if (hit?.ms === stat.mtimeMs) {
    const { ms, ...info } = hit
    return info
  }

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

  cache.set(filePath, { ...d, ms: stat.mtimeMs })

  return d
}

export async function updateRouteMeta(routes: Route[]) {
  for (const route of routes) {
    if (route.children) {
      await updateRouteMeta(route.children)
    } else {
      if (/index\.md$/.test(route.component)) {
        route.path += route.path ? '/index' : 'index'
      }

      if (/\/docs\//.test(route.path)) {
        route.meta ||= {}
        route.meta.layout = 'docs'

        const filePath = path.resolve('./' + route.component)
        const info = await getArticleConfigSync(filePath)
        route.meta.info = info
      }

      route.path = permalink(route.path)
    }
  }
}

/**
 * generate a url valid link.
 * @param str
 * @returns
 */
function permalink(str: string) {
  const isValidChar = /[a-z0-9-+\/]/

  let s = ''
  for (const char of str) {
    if (isValidChar.test(char)) {
      s += char
    } else if (/\s/.test(char)) {
      s += '-'
    } else {
      s += char.charCodeAt(0).toString(36)
    }
  }
  return s
}
