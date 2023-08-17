import { type Router } from 'vitepress'
export { sleep } from '@0x-jerry/utils'

export function scrollToAnchor(anchorHref: string, router: Router) {
  const url = new URL(location.href)
  url.hash = decodeURI(anchorHref)

  router.go(url.toString())
}
