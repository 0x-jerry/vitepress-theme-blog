<script setup lang="ts">
import { blog } from '~/blog'

const isDev = import.meta.env.DEV
if (isDev) {
  console.log('site config', blog)
}

const articles = isDev ? blog.articles : blog.articles.filter((o) => o.visible)
</script>

<template>
  <router-link to="/">
    <v-logo class="relative top-10 left-10" width="100"></v-logo>
  </router-link>

  <ul>
    <li v-for="o in articles">
      <v-excerpt :info="o" />
    </li>
  </ul>
</template>
