<script lang="ts" setup>
import { ArticleInfo } from 'virtual:blog'

defineProps<{
  info: ArticleInfo
}>()
</script>

<template>
  <div m="10">
    <router-link class="mx-10 my-5" :to="info.routePath">
      {{ info.title }}
    </router-link>
    <div class="prose m-auto text-left" v-html="info.excerpt"></div>
  </div>
</template>
