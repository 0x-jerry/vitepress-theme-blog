import path from 'path'
import { promises as fs } from 'fs'
import matter from 'gray-matter'
import { ArticleInfo, TocLink } from 'virtual:blog'
import { Route } from 'vite-plugin-pages'
import MarkdownIt from 'markdown-it'
import { setupMarkdownIt } from '../markdown'
import { JSDOM } from 'jsdom'
import { fileToUrl } from './asset'
import { globalData } from './global'

interface ArticleCacheInfo extends ArticleInfo {
  ms: number
}

const cache = new Map<string, ArticleCacheInfo>()

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

setupMarkdownIt(md)

export async function getArticleConfig(filePath: string) {
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

  const tocLinks = getHeaders(c.content)

  const articleInfo: ArticleInfo = {
    visible: true,
    title: parsedPath.name,
    routePath: '',
    date: new Date(),
    tags: [],
    excerpt: await renderMarkdown(c.excerpt?.trim() || '', filePath),
    toc: tocLinks,
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

        const filePath = path.resolve('./' + route.component)
        const info = await getArticleConfig(filePath)
        route.meta.info = info

        route.path = permalink(route.path)
      }
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

async function renderMarkdown(content: string, importer: string) {
  const result = md.render(content)

  // dom
  const $ = new JSDOM(result)

  const doc = $.window.document

  const images = doc.querySelectorAll('img')

  // get correct url, this is a hack solution.
  for (let idx = 0; idx < images.length; idx++) {
    const img = images[idx]
    const resource = (await globalData.ctx.resolve(img.src, importer))!

    img.src = await fileToUrl(resource.id, globalData.conf, globalData.ctx)

    const parsed = path.parse(resource.id)

    if (globalData.conf.command === 'build') {
      // ex. __VITE_ASSET__5db78800__
      const hash = img.src.slice('__VITE_ASSET__'.length, -'__'.length)

      const buildAssetDir = globalData.conf.build.assetsDir

      img.src = `/${buildAssetDir}/${parsed.name}.${hash}${parsed.ext}`
    }
  }

  return doc.body.innerHTML
}

function getHeaders(content: string): TocLink[] {
  const result = md.render(content)

  // dom
  const $ = new JSDOM(result)

  const nodes = $.window.document.querySelectorAll('h1,h2,h3,h4,h5,h6,h7')

  return Array.from(nodes).map((node) => ({
    level: +node.tagName.replace(/h/i, ''),
    label: node.textContent!.replace(/#$/, ''),
    id: node.id,
  }))
}
