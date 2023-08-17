<script lang="ts" setup>
import 'heti'
import { useHead } from '@vueuse/head'
import { useI18n } from '@/lib/i18n'
import { useTheme } from './hooks/useTheme'
import { useRoute, useRouter } from 'vitepress'
import { isMatchRoute, routes } from './routes'
import AboutPage from './views/About.vue'
import { computed } from 'vue'

const { t } = useI18n()
const theme = useTheme()

useHead({
  title: t('title.index', [theme.value.name]),
  meta: [{ name: 'rss', content: '/rss2.xml' }],
  link: [
    { href: '/rss2.xml', rel: 'alternate', title: 'RSS', type: 'application/rss+xml' },
    {
      rel: 'preload',
      as: 'font',
      crossorigin: 'anonymous',
      href: '//cdn.jsdelivr.net/gh/0x-jerry/static/fonts/LXGW/LXGWWenKaiMono-Regular.woff2',
    },
    {
      rel: 'preload',
      as: 'font',
      crossorigin: 'anonymous',
      href: '//cdn.jsdelivr.net/gh/0x-jerry/static/fonts/LXGW/LXGWWenKaiMono-Regular.woff',
    },
  ],
  script: [
    {
      async: '',
      defer: '',
      'data-website-id': '11ac5c86-f341-454d-8ce8-09acd333bf07',
      href: 'https://umami.0x-jerry.icu/umami.js',
    },
  ],
})

const router = useRouter()
const route = useRoute()

const isAbout = computed(() => {
  return route.path === '/about.html'
})
</script>

<template>
  <div>
    <AboutPage v-if="isAbout"></AboutPage>
    <template v-else>
      <v-header />
      <div w="full md:max-1200px" m="x-auto">
        <template v-for="route in routes">
          <component v-if="isMatchRoute(route, router.route)" :is="route.component"> </component>
        </template>
        <br />
      </div>
      <v-footer />
      <v-go-top />
    </template>
  </div>
</template>

<style lang="less"></style>
