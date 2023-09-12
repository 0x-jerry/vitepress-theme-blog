<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from '@@/lib/i18n'
import VExcerpt from '@@/components/VExcerpt.vue'
import { data } from '@@/data/excerpts.data'

const { t } = useI18n()

useHead({
  title: t('title.posts', [t('name')]),
})
</script>

<template>
  <div class="description">
    <Content></Content>
  </div>
  <ul>
    <li v-for="o in data" :key="o.data.title">
      <VExcerpt v-bind="o.data" :href="o.url" class="p-5 my-5 mx-auto heti">
        <div v-html="o.html"></div>
      </VExcerpt>
    </li>
  </ul>
</template>

<style scoped>
ul {
  padding-left: 0;
}

li {
  list-style: none;
}
</style>
