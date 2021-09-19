<script setup lang="ts">
import { blog } from '~/blog'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: `${t('name')}'s Posts`,
})

const isDev = import.meta.env.DEV
if (isDev) {
  console.log('site config', blog)
}

const articles = isDev ? blog.articles : blog.articles.filter((o) => o.visible)
</script>

<template>
  <ul>
    <li v-for="o in articles">
      <v-excerpt :info="o" />
    </li>
  </ul>
</template>
