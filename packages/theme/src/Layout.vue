<script lang="ts" setup>
import 'heti'
import { useHead } from '@vueuse/head'
import { useI18n } from './lib/i18n'
import { useTheme } from './hooks/useTheme'
import { useRoute } from 'vitepress'
import { getRouteComponent } from './routes'

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

const route = useRoute()
</script>

<template>
  <component :is="getRouteComponent(route)"> </component>
</template>

<style lang="less"></style>
