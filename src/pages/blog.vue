<script setup lang="ts">
import conf from 'virtual:blog'

const isDev = import.meta.env.DEV
if (isDev) {
  console.log('site config', conf)
}
</script>

<template>
  <ul class="flex flex-wrap">
    <li v-for="o in conf.articles">
      <router-link class="mx-10 my-5" :to="`/docs/${o.routePath}`">
        {{ o.title }}
      </router-link>
    </li>
  </ul>
</template>
