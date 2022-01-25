<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { modules } from '~blog/excerpts/entry'

const { t } = useI18n()

useHead({
  title: t('title.posts', [t('name')]),
})
</script>

<template>
  <ul>
    <li v-for="o in modules" :key="o.uuid">
      <component v-if="o.data.publish !== false" :is="o.module" p="5" m="y-5 x-4" />
    </li>
  </ul>
</template>
