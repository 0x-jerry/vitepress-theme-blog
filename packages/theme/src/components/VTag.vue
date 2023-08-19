<script lang="ts" setup>
import type { Component } from 'vue'
import TagIcon from '~icons/carbon/hashtag'

defineProps<{
  icon?: Component
  content?: string
}>()
</script>

<template>
  <span class="v-tag">
    <slot name="icon">
      <i class="mr-1 text-gray-4">
        <component :is="icon || TagIcon" class="inline-block relative -top-0.1em"></component>
      </i>
    </slot>
    <slot>
      {{ content }}
    </slot>
  </span>
</template>

<style lang="less" scoped>
.v-tag {
  @apply px-2 py-1px  mr-1 inline-block;
  @apply border rounded-full bg-light-400;
}
</style>
