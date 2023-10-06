<script setup lang="ts">
import { useI18n } from '@@/lib/i18n'
import VExcerpt from '@@/components/VExcerpt.vue'
import { data } from '@@/data/excerpts.data'
import VTitle from '@@/components/VTitle.vue'

const { t } = useI18n()

const title = t('title.index', [t('name')])
</script>

<template>
  <VTitle :title="title"></VTitle>
  <div class="description">
    <Content></Content>
  </div>
  <ul>
    <li v-for="o in data" :key="o.data.title">
      <VExcerpt v-bind="o.data" :href="o.url" class="p-5 my-5 mx-auto heti"> </VExcerpt>
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
