import type { ReadTimeResults } from 'reading-time'
import type { FeedOptions } from 'feed'

export interface ExcerptData {
  date: string
  title: string
  tags?: string[]
  license?: string
  read: ReadTimeResults
}

export interface BlogExcerpt {
  data: ExcerptData
  // html: string
  url: string
}
