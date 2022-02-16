<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { modules } from '~blog/excerpts/entry'

const { t } = useI18n()

useHead({
  title: t('title.tags', [t('name')]),
})

const tags: { label: string; count: number }[] = []

modules.forEach((m) => {
  const _tags: string[] = m.data.tags || []

  for (const tag of _tags) {
    const hit = tags.find((t) => t.label === tag)
    if (!hit) {
      tags.push({
        label: tag,
        count: 1,
      })
    } else {
      hit.count++
    }
  }
})

tags.sort((a, b) => b.count - a.count)
</script>

<template>
  <div class="v-tags" flex="~ wrap" m="t-4" p="x-4">
    <router-link class="py-2" v-for="o in tags" :key="o.label" :to="`/tag/${o.label}`">
      <v-tag>{{ o.label }} | {{ o.count }} </v-tag>
    </router-link>
  </div>
</template>

<style></style>
