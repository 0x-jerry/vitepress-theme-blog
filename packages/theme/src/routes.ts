import { Route } from 'vitepress'
import { Component } from 'vue'
import Posts from './views/Index.vue'
import Post from './views/Post.vue'

interface RouteItem {
  match: RegExp | string | ((route: Route) => boolean)
  component: Component
  meta?: Record<string, any>
}

export const routes: RouteItem[] = [
  {
    match: '/',
    component: Posts,
  },
  {
    match: /^\/posts\//,
    component: Post,
  },
]

export const isMatchRoute = (item: RouteItem, route: Route): boolean => {
  if (typeof item.match === 'string') {
    return item.match === route.path
  }

  if (item.match instanceof RegExp) {
    return item.match.test(route.path)
  }

  return item.match(route)
}
