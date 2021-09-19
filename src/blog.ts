import { ArticleInfo } from 'virtual:blog'
import generatedRoutes from 'virtual:generated-pages'
import { computed, reactive } from 'vue'

export const blog = reactive({
  articles: computed<ArticleInfo[]>(() => {
    const docs = generatedRoutes.filter((f) => /^\/docs\//.test(f.path))

    return (
      docs.map((route) => {
        const info = route.meta?.info as ArticleInfo

        info.routePath = route.path
        return info
      }) || []
    )
  }),
})
