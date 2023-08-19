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
      <i class="mr-1 text-gray-4 flex">
        <component :is="icon || TagIcon"></component>
      </i>
    </slot>
    <slot>
      {{ content }}
    </slot>
  </span>
</template>

<style lang="less" scoped>
.v-tag {
  @apply px-2 py-1px  mr-1 inline-flex items-center;
  @apply border rounded-full bg-light-7;
}
</style>
