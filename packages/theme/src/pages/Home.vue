<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from '@@/lib/i18n'
import VExcerpt from '@@/components/VExcerpt.vue'
import data from '@blog/excerpts'

const { t } = useI18n()

useHead({
  title: t('title.posts', [t('name')]),
})
</script>

<template>
  <ul>
    <li v-for="o in data" :key="o.data.title">
      <VExcerpt v-bind="o.data" class="p-5 my-5 mx-4">
        <component :is="o.comp"></component>
      </VExcerpt>
    </li>
  </ul>
</template>
