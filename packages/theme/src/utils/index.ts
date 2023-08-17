import { type Router } from 'vitepress'

export function scrollToAnchor(anchorHref: string, router: Router) {
  const url = new URL(location.href)
  url.hash = decodeURI(anchorHref)

  router.go(url.toString())
}

export const sleep = (ts: number) => new Promise((resolve) => setTimeout(resolve, ts))
