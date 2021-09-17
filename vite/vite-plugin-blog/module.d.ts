declare module 'virtual:blog' {
  export interface ArticleInfo {
    /**
     * @default true
     */
    visible: boolean
    /**
     * @default filename
     */
    title: string
    /**
     * filename
     */
    routePath: string
    /**
     * create date
     */
    date: number
    /**
     * @default []
     */
    tags: string[]
    /**
     *
     */
    excerpt: string

    toc: TocLink[]
  }

  export interface TocLink {
    level: number
    label: string
    id: string
  }

  export interface BlogConfig {
    articles: ArticleInfo[]
  }

  const v: BlogConfig

  export default v
}
