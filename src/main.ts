// register vue composition api globally
import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'

import 'heti'
// windicss layers
import 'virtual:windi.css'
// custom styles here
import './styles/main.less'
import { nextTick } from 'vue'
import { UserModule } from './types'

const routes = setupLayouts(generatedRoutes)

if (!import.meta.env.SSR) {
  console.log(routes)
}

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes,
    async scrollBehavior(to, _, savePoint) {
      if (savePoint) return savePoint

      if (to.hash) {
        // Ensure component has rendered
        await nextTick()

        const hash = decodeURI(to.hash).slice(1)

        const el = document.getElementById(hash) as HTMLDivElement

        return {
          top: el.offsetTop - 80,
          behavior: 'smooth',
        }
      } else {
        return { left: 0, top: 0 }
      }
    },
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(
      import.meta.glob<{ install?: UserModule }>('./modules/*.ts', { eager: true }),
    ).map((i) => i.install?.(ctx))
  },
)
