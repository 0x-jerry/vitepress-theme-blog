<script lang="ts" setup>
import VLink from './VLink.vue'
import VTag from './VTag.vue'
import dayjs from 'dayjs'
import type { ExcerptData } from '../../types'
import { computed } from 'vue';

interface VExcerptProps extends ExcerptData {
  href: string
}

const props = withDefaults(defineProps<VExcerptProps>(), {
  tags: () => [],
})

const restTags = computed(() => props.tags.slice(2))
</script>

<template>
  <div class="flex-(~ col) gap-2 xl:flex-row">
    <div class="flex-(~ wrap) gap-2 items-center">
      <VTag>{{ dayjs.tz(date).format('YYYY-MM-DD') }}</VTag>
      <VLink :href="href">{{ title }}</VLink>
    </div>
    <div v-if="tags.length" class="pb-4 mb-2 xl:(p-0 m-0 border-none)" flex="~ warp gap-2 items-center"
      border="0 b solid bGray-1">
      <VTag v-for="tag in tags.slice(0, 2)" :href="`/tags/${tag}`">{{ tag }}</VTag>
      <VTag v-if="restTags.length > 0" :title="restTags.join(', ')">+{{ restTags.length }}</VTag>
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
