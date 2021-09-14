import path from 'path'
import { Plugin } from 'vite'

const vitePlugin: Plugin = {
  name: 'vite-fix-resources',
  resolveId(id, importer) {
    if (id.startsWith('.') && id.endsWith('.png') && importer?.endsWith('.md')) {
      return path.join(importer, '..', decodeURI(id))
    }
  },
}

export default vitePlugin
