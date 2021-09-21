import { Router } from 'vue-router'

export function scrollToAnchor(anchorHref: string, router: Router) {
  const url = new URL(anchorHref, location.href)

  router.push(url)
}

export const sleep = (ts: number) => new Promise((resolve) => setTimeout(resolve, ts))
