<script lang="ts" setup>
import { type Header } from 'vitepress'
import NavComp from './VArticleNav.vue'
import VLink from './VLink.vue'

defineProps<{
  headers: Header[]
}>()
</script>

<template>
  <ul class="v-article-nav">
    <li v-for="h in headers" class="truncate">
      <VLink :href="h.link" theme="gray">
        {{ h.title }}
      </VLink>
      <NavComp v-if="h.children" :headers="h.children" />
    </li>
  </ul>
</template>

<style lang="less" scoped>
li {
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }

  ul {
    margin-top: 4px;
  }
}
</style>
