<script setup lang="ts">
import { blogConfig } from '~/blog'

const isDev = import.meta.env.DEV
if (isDev) {
  console.log('site config', blogConfig)
}
</script>

<template>
  <ul class="flex flex-wrap">
    <li v-for="o in blogConfig.articles">
      <router-link class="mx-10 my-5" :to="o.routePath">
        {{ o.title }}
      </router-link>
    </li>
  </ul>
</template>
