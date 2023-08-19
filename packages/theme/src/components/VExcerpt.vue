<script lang="ts" setup>
import type { ReadTimeResults } from 'reading-time'
import VCard from './VCard.vue'
import VLink from './VLink.vue'
import VPostLabels from './VPostLabels.vue'

interface VExcerptProps {
  title: string
  href: string
  date: Date | string
  tags?: string[]
  read?: ReadTimeResults
}

const props = withDefaults(defineProps<VExcerptProps>(), {
  tags: () => [],
})
</script>

<template>
  <VCard class="break-words">
    <VLink :href="href">
      <h2 class="text-(xl blue-5) mb-2 mt-0">
        {{ title }}
      </h2>
    </VLink>
    <div >
      <VPostLabels v-bind="props" />
    </div>
    <!-- <hr m="y-4" /> -->
    <div class="heti !max-w-full m-auto text-left">
      <slot />
    </div>
  </VCard>
</template>

<style scoped>
.tag {
  @apply px-2 py-1px  mr-1;
  @apply border rounded-full bg-light-400;
}
</style>
