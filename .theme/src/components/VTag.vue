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
  white-space: pre;
  @apply border rounded text-sm px-2 font-mono border-(1 solid);

  @apply border-bGray-1 bg-bGray-50 text-bGray-5 hover:text-bGray-7;

  &[href] {
    cursor: pointer;
    text-decoration: none;
  }

  &.is-bPrimary {
    @apply border-bPrimary-1 bg-bPrimary-50 text-bPrimary-5 hover:text-bPrimary-7;
  }

  &.is-red {
    @apply border-red-1 bg-red-50 text-red-5 hover:text-red-7;
  }
}
</style>
