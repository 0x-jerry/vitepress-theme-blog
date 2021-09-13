import path from 'path'
import { Plugin, ResolvedConfig } from 'vite'
import { getArticleConfig, getBlogData } from './resolveData'

const virtualModuleId = 'virtual:blog'
const hotUpdateId = virtualModuleId + ':hot'

let viteConf: null | ResolvedConfig = null

export function VitePluginBlog(dir: string): Plugin {
  dir = path.resolve(dir)

  return {
    name: 'vite-plugin-blog',
    enforce: 'post',
    configResolved(config) {
      viteConf = config
    },
    configureServer(server) {
      const { moduleGraph, watcher, ws } = server

      function fullReload(onlyInvalidate = false) {
        const module = moduleGraph.getModuleById(virtualModuleId)
        if (module) {
          moduleGraph.invalidateModule(module)
        }

        if (onlyInvalidate) {
          return
        }

        ws.send({
          type: 'full-reload',
        })
      }

      watcher.on('add', (file) => {
        if (file.startsWith(dir) && file.endsWith('.md')) {
          fullReload()
        }
      })

      watcher.on('unlink', (file) => {
        if (file.startsWith(dir) && file.endsWith('.md')) {
          fullReload()
        }
      })

      watcher.on('change', (file) => {
        if (file.startsWith(dir) && file.endsWith('.md')) {
          fullReload(true)
        }
      })
    },
    resolveId(id, importer) {
      if (id === virtualModuleId) {
        return virtualModuleId
      }

      if (id.startsWith('.') && id.endsWith('.png') && importer?.endsWith('.md')) {
        return path.join(importer, '..', decodeURI(id))
      }
    },
    async handleHotUpdate(ctx) {
      if (!ctx.file.startsWith(dir)) {
        return
      }

      const article = await getArticleConfig(ctx.file)

      ctx.server.ws.send({
        type: 'custom',
        event: hotUpdateId,
        data: article,
      })
    },
    async load(id) {
      if (id !== virtualModuleId) {
        return null
      }

      const config = await getBlogData(dir, viteConf?.env.DEV)

      const code = `
import { reactive } from 'vue'
const data = reactive(${JSON.stringify(config)})

if (import.meta.hot) {
  import.meta.hot.on("${hotUpdateId}", (articleData) => {
    const hit = data.articles.findIndex(a => a.routePath === articleData.routePath)

    if (hit >= 0) {
      data.articles[hit] = articleData
    } else {
      data.articles.push(articleData)
    }
  })
}

export default data;
`

      return {
        code,
      }
    },
  }
}
