<script lang="ts" setup>
import 'heti'
import { useHead } from '@vueuse/head'
import { useI18n } from './lib/i18n'
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
      rel: 'stylesheet',
      crossorigin: 'anonymous',
      referrerpolicy: 'no-referrer',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/lxgw-wenkai-webfont/1.7.0/style.css',
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
