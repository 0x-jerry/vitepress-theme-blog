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
      <v-excerpt v-bind="o.data" p="5" m="y-5 x-4">
        <component :is="o.comp"></component>
      </v-excerpt>
    </li>
  </ul>
</template>
