import { ArticleInfo } from 'virtual:blog'
import generatedRoutes from 'virtual:generated-pages'
import { computed, reactive } from 'vue'

export const blog = reactive({
  articles: computed<ArticleInfo[]>(() => {
    const allDocs = generatedRoutes.filter((f) => /^\/docs\//.test(f.path))

    const docs =
      allDocs.map((route) => {
        const info = route.meta?.info as ArticleInfo

        info.date = new Date(info.date)
        info.routePath = route.path
        return info
      }) || []

    docs.sort((a, b) => b.date.getTime() - a.date.getTime())

    return docs
  }),
  tags: computed(() => {
    const tags: Tag[] = []

    const getTag = (label: string) => {
      const hit = tags.find((t) => t.label === label)

      if (hit) return hit

      const tag: Tag = {
        label,
        count: 0,
      }

      tags.push(tag)
      return tag
    }

    blog.articles.forEach((info) => {
      info.tags.forEach((label) => {
        const t = getTag(label)
        t.count++
      })
    })

    return tags
  }),
})

interface Tag {
  label: string
  count: number
}
