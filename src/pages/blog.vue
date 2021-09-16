<script setup lang="ts">
import { blogConfig } from '~/blog'

const isDev = import.meta.env.DEV
if (isDev) {
  console.log('site config', blogConfig)
}

const articles = isDev ? blogConfig.articles : blogConfig.articles.filter((o) => o.visible)
</script>

<template>
  <v-logo width="100"></v-logo>

  <ul class="flex flex-wrap">
    <li v-for="o in articles" display="block">
      <v-excerpt :info="o" />
    </li>
  </ul>
</template>
