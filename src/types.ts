import { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface TocLink {
  id: string
  label: string
  level: number
}
