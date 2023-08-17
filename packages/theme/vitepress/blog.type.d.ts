declare module '@blog/excerpts' {
  import { Component } from 'vue'
  import { ReadTimeResults } from 'reading-time'

  export interface ExcerptData {
    date: string
    title: string
    tags?: string[]
    license?: string
    href: string
    read: ReadTimeResults
  }

  export interface BlogExcerpt {
    data: ExcerptData
    comp: Component
  }

  var data: BlogExcerpt[]
  export default data
}
