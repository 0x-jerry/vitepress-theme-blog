<script lang="ts" setup>
import VLink from './VLink.vue'
import VTag from './VTag.vue'
import dayjs from 'dayjs'
import type { ExcerptData } from '../../types'
import VAutoResize from './VAutoResize.vue';

interface VExcerptProps extends ExcerptData {
  href: string
}

withDefaults(defineProps<VExcerptProps>(), {
  tags: () => [],
})

</script>

<template>
  <div class="flex-(~ col) gap-2 xl:flex-row">
    <div class="flex-(~ wrap) gap-2 items-center">
      <VTag>{{ dayjs.tz(date).format('YYYY-MM-DD') }}</VTag>
      <VLink :href="href">{{ title }}</VLink>
    </div>
    <VAutoResize v-if="tags.length" :list="tags"
      inner-class="pb-4 mb-2 xl:(p-0 m-0 border-none) flex gap-2 items-center border-(0 b solid bGray-1)">
      <template #default="{ item: tag }">
        <VTag :href="`/tags?t=${tag}`">{{ tag }}</VTag>
      </template>
      <template #collapsed="{ items }">
        <VTag>+{{ items.length }}</VTag>
      </template>
    </VAutoResize>
  </div>
</template>

<style scoped>
</style>
