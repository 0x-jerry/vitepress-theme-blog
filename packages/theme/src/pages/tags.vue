<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { useI18n } from '@@/lib/i18n'
import { modules } from '@blog/excerpts/entry'

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
  <div class="v-tags" flex="~ wrap" m="t-4" p="x-4" grid="gap-2">
    <v-link v-for="o in tags" :key="o.label" :href="`/tag/${o.label}`">
      <v-tag>{{ o.label }} | {{ o.count }} </v-tag>
    </v-link>
  </div>
</template>

<style></style>
