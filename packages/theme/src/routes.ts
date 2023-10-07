import { type Route } from 'vitepress'
import { type Component, defineComponent, h } from 'vue'
import DefaultLayout from './layout/DefaultLayout.vue'
import Home from './pages/Home.vue'
import Post from './pages/Post.vue'
import About from './pages/About.vue'
import NotFound from './pages/NotFound.vue'
import Tags from './pages/Tags.vue'
import Search from './pages/Search.vue'

interface RouteItem {
  match: RegExp | string | ((route: Route) => boolean)
  layout?: Component
  component: Component
  meta?: Record<string, any>
}

export const routes: RouteItem[] = [
  {
    match: '/',
    layout: DefaultLayout,
    component: Home,
  },
  {
    match: /^\/posts\//,
    layout: DefaultLayout,
    component: Post,
  },
  {
    match: '/about',
    layout: DefaultLayout,
    component: About,
  },
  {
    match: '/tags',
    layout: DefaultLayout,
    component: Tags,
  },
  {
    match: /^\/tags\//,
    layout: DefaultLayout,
    component: Tags,
  },
  {
    match: '/search',
    layout: DefaultLayout,
    component: Search,
  },
]

export function getRouteComponent(route: Route) {
  for (const item of routes) {
    if (!isMatchRoute(item, route)) {
      continue
    }

    return item.layout ? withLayout(item.layout, item.component) : item.component
  }

  return withLayout(DefaultLayout, NotFound)
}

function isMatchRoute(item: RouteItem, route: Route): boolean {
  if (typeof item.match === 'string') {
    return item.match === route.path
  }

  if (item.match instanceof RegExp) {
    return item.match.test(route.path)
  }

  return item.match(route)
}

function withLayout(layout: Component, page: Component) {
  return defineComponent(() => () => h(layout, null, () => h(page)))
}
