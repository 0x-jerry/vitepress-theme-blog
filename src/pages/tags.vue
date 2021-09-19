<script lang="ts" setup>
import { computed } from 'vue'
import { blog } from '~/blog'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({
  title: `${t('name')}'s Tags`,
})

interface Tag {
  label: string
  count: number
}

function getTags() {
  const tags: Tag[] = []

  const getTag = (label: string) => {
    const hit = tags.find((t) => t.label === label)

    if (hit) return hit

    const tag: Tag = {
      label,
      count: 0,
    }

    tags.push(tag)
    return tag
  }

  blog.articles.forEach((info) => {
    info.tags.forEach((label) => {
      const t = getTag(label)
      t.count++
    })
  })

  return tags
}

const tags = computed(() => getTags())
</script>

<template>
  <div class="v-tags" flex="~ wrap">
    <router-link class="py-3" v-for="o in tags" :key="o.label" :to="`/tag/${o.label}`">
      <v-tag>{{ o.label }} | {{ o.count }} </v-tag>
    </router-link>
  </div>
</template>

<style></style>
