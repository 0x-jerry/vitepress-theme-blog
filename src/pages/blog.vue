<script setup lang="ts">
import { blogConfig } from '~/blog'

const isDev = import.meta.env.DEV
if (isDev) {
  console.log('site config', blogConfig)
}

const articles = isDev ? blogConfig.articles : blogConfig.articles.filter((o) => o.visible)
</script>

<template>
  <ul class="flex flex-wrap">
    <li v-for="o in articles">
      <router-link class="mx-10 my-5" :to="o.routePath">
        {{ o.title }}
      </router-link>
    </li>
  </ul>
</template>
