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
  @apply border rounded text-sm px-2 font-mono border-(1 solid);

  @apply border-bGray-100 bg-bGray-50 text-bGray-500 hover:text-bGray-700;

  &[href] {
    cursor: pointer;
    text-decoration: none;
  }

  &.is-bPrimary {
    @apply border-bPrimary-100 bg-bPrimary-50 text-bPrimary-500 hover:text-bPrimary-700;
  }

  &.is-red {
    @apply border-red-100 bg-red-50 text-red-500 hover:text-red-700;
  }
}
</style>
