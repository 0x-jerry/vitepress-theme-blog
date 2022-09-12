<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { modules } from '@blog/excerpts/entry'

const { t } = useI18n()

const publishedModules = computed(() =>
  modules.filter((n) => (import.meta.env.DEV ? true : n.data.publish !== false)),
)

useHead({
  title: t('title.posts', [t('name')]),
})
</script>

<template>
  <ul>
    <li v-for="o in publishedModules" :key="o.uuid">
      <component :is="o.module" p="5" m="y-5 x-4" />
    </li>
  </ul>
</template>
