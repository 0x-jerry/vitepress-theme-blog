<script lang="ts" setup>
defineProps<{
  href?: string
}>()
</script>

<template>
  <a class="v-tag" :href="href">
    <slot> </slot>
  </a>
</template>

<style lang="less" scoped>
.v-tag {
  @apply border rounded text-xs px-2 font-mono border-(1 solid);

  @apply border-gray-100 bg-gray-50 text-gray-500 hover:text-gray-700;

  &[href] {
    cursor: pointer;
    text-decoration: none;
  }

  &.is-blue {
    @apply border-blue-100 bg-blue-50 text-blue-500 hover:text-blue-700;
  }
}
</style>
