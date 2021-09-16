<script lang="ts" setup>
import { ArticleInfo } from 'virtual:blog'

defineProps<{
  info: ArticleInfo
}>()
</script>

<template>
  <div m="10" p="5" shadow="lg">
    <router-link class="mx-10 my-5" :to="info.routePath">
      <h2 text="xl blue-500">
        {{ info.title }}
      </h2>
      <div class="prose m-auto text-left" v-html="info.excerpt"></div>
    </router-link>
  </div>
</template>
