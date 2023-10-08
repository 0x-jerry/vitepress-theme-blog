<script lang="ts" setup>
import VLink from './VLink.vue'
import VTag from './VTag.vue'
import dayjs from 'dayjs'
import type { ExcerptData } from '../../types'

interface VExcerptProps extends ExcerptData {
  href: string
}

withDefaults(defineProps<VExcerptProps>(), {
  tags: () => [],
})
</script>

<template>
  <div class="flex-(~ col) gap-2 md:flex-row">
    <div class="flex-(~ wrap) gap-2 items-center">
      <VTag>{{ dayjs.tz(date).format('YYYY-MM-DD') }}</VTag>
      <VLink :href="href">{{ title }}</VLink>
    </div>
    <div
      v-if="tags.length"
      class="flex-(~ wrap) gap-2 items-center border-(0 b solid gray-100) pb-4 mb-2 md:(p-0 m-0 border-none)"
    >
      <VTag v-for="tag in tags" :href="`/tags/${tag}`">{{ tag }}</VTag>
      <VTag v-if="!publish" class="is-red">Unpluinshed</VTag>
    </div>
  </div>
</template>

<style scoped>
.tag {
  @apply px-2 py-1px mr-1;
  @apply border rounded-full bg-light-400;
}
</style>
