import path from 'path'
import readingTime from 'reading-time'
import { type Plugin } from 'vite'
import { type MarkdownRenderer, createMarkdownRenderer } from 'vitepress'
import { highlight } from './highlight'
import { readFile, readdir } from 'fs/promises'
import type { ExcerptData } from '@blog/excerpts'
import dayjs from 'dayjs'

export interface BlogPluginConfig {
  prefixPath: string
}

const PREFIX_ID = '@blog'

const VIRTUAL_ID = {
  PREFIX: PREFIX_ID,
  EXCERPTS: PREFIX_ID + '/excerpts',
  TAGS: PREFIX_ID + '/tags',
} as const

export function createBlogPlugin(config: Partial<BlogPluginConfig>): Plugin {
  const opt: BlogPluginConfig = Object.assign(
    {
      prefixPath: '/posts',
    },
    config,
  )

  let md!: MarkdownRenderer

  const cwd = process.cwd()

  const mdCache = new Map<string, { data: ExcerptData; sfc: string }>()

  const srcDir = path.join(cwd, opt.prefixPath)

  return {
    name: 'vitepress-blog-plugin',

    resolveId(source, importer) {
      if (importer?.startsWith(VIRTUAL_ID.PREFIX)) {
        const isResource = /\.(jpg|png|jpeg|webp)/.test(source)

        if (isResource && !path.isAbsolute(source)) {
          const prefix = path.join(cwd, opt.prefixPath)
          return path.join(prefix, source)
        }
      }

      if (source.startsWith(VIRTUAL_ID.PREFIX)) {
        return source
      }
    },
    async load(id) {
      md ||= await createMarkdownRenderer(cwd, {
        highlight: await highlight(),
        frontmatter: {
          grayMatterOptions: {
            excerpt_separator: '<!-- more -->',
          },
        },
      })

      if (id.startsWith(VIRTUAL_ID.EXCERPTS)) {
        return await genExpertsData()
      }

      if (id.startsWith(VIRTUAL_ID.PREFIX)) {
        const file = id.slice(VIRTUAL_ID.PREFIX.length)
        const pathFile = path.join(srcDir, file.replace(/\.vue/, '.md'))

        const data = mdCache.get(pathFile)

        return data!.sfc
      }
    },
    async handleHotUpdate(ctx) {
      const needUpdateModules = ctx.modules.filter((n) => isBlogExcerpt(n.id))
      const id = needUpdateModules[0]?.id
      if (!id) {
        return
      }

      await mdExcerptToVue(ctx.file)

      const data = mdCache.get(ctx.file)

      ctx.read = () => data!.sfc
    },
  }

  async function mdExcerptToVue(file: string) {
    // @ts-ignore
    // md.__path = file

    const env: any = {
      // path: file,
      // relativePath,
      // cleanUrls
    }

    const src = await readFile(file, { encoding: 'utf-8' })
    md.render(src, env)

    const { frontmatter = {}, excerpt = '' } = env

    const read = readingTime(excerpt)

    const sfc = `<template><div>${env.excerpt}</div></template>`

    const excerptData = {
      sfc,
      data: {
        ...frontmatter,
        href: path.join(opt.prefixPath, file.replace(srcDir, '').replace('.md', '.html')),
        read,
      } as ExcerptData,
    }

    mdCache.set(file, excerptData)

    return excerptData
  }

  async function genExpertsData() {
    const files = (await readdir(srcDir)).filter((n) => n.endsWith('.md'))

    const codes = []

    files.forEach((item, idx) => {
      codes.push(`import comp${idx} from "${VIRTUAL_ID.PREFIX}/${item.replace(/\.md/, '.vue')}"`)
    })

    const datas = await Promise.all(
      files.map(async (n) => (await mdExcerptToVue(path.join(srcDir, n))).data),
    )

    datas.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())

    const dataCodes = datas
      .map(
        (data, idx) => `{
        data: ${JSON.stringify(data)},
        comp: comp${idx}
      }`,
      )
      .join(',')

    codes.push(`const data = [${dataCodes}];`)

    codes.push(`export default data;`)

    return codes.join('\n')
  }
}

function isBlogExcerpt(id: string | null) {
  return !!id?.startsWith(VIRTUAL_ID.PREFIX + '/')
}
