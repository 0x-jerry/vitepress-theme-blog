<script setup lang="ts">
import { useI18n } from '@@/lib/i18n'
import VExcerpt from '@@/components/VExcerpt.vue'
import { data } from '@@/data/excerpts.data'
import VTitle from '@@/components/VTitle.vue'
import { useTheme } from '@@/hooks/useTheme'

const theme = useTheme()

const { t } = useI18n()

const title = t('title.index', [theme.value.name])
</script>

<template>
  <VTitle class="mb-4" :title="title"></VTitle>
  <div class="description">
    <Content></Content>
  </div>
  <div class="flex-(~ col) gap-2">
    <template v-for="o in data" :key="o.data.title">
      <VExcerpt v-bind="o.data" :href="o.url"> </VExcerpt>
    </template>
  </div>
</template>

<style scoped>
ul {
  padding-left: 0;
}

li {
  list-style: none;
}
</style>
