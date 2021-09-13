<script setup lang="ts">
import conf from 'virtual:blog'

const isDev = import.meta.env.DEV
if (isDev) {
  console.log('site config', conf)
}
</script>

<template>
  <ul class="flex flex-wrap">
    <li>
      <router-link class="mx-10 my-5" to="/blog"> blog </router-link>
    </li>
  </ul>
</template>
