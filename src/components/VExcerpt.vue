<script lang="ts" setup>
import type { ReadTimeResults } from 'reading-time'

interface VExcerptProps {
  title: string
  href: string
  date: string
  tags?: string[]
  read: ReadTimeResults
}

const props = withDefaults(defineProps<VExcerptProps>(), {
  tags: () => [],
})
</script>

<template>
  <v-card text="break-words">
    <router-link :to="href">
      <h2 text="xl blue-500">
        {{ title }}
      </h2>
    </router-link>
    <div m="t-2 b-5">
      <v-post-labels v-bind="props" />
    </div>
    <!-- <hr m="y-4" /> -->
    <div class="heti !max-w-full m-auto text-left">
      <slot />
    </div>
  </v-card>
</template>

<style scoped>
.tag {
  @apply px-2 py-1px  mr-1;
  @apply border rounded-full bg-light-400;
}
</style>
