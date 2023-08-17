<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from './lib/i18n'

const { t } = useI18n()

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: t('title.index', [t('name')]),
  meta: [{ name: 'rss', content: '/rss2.xml' }],
  link: [{ href: '/rss2.xml', rel: 'alternate', title: 'RSS', type: 'application/rss+xml' }],
})
</script>

<template>
  <div>
    <router-view />
    <v-client-only>
      <v-pwa />
    </v-client-only>
  </div>
</template>
