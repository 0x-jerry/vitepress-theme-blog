<script lang="ts" setup>
defineProps<{
  width?: string | number
}>()
</script>

<template>
  <img src="/favicon.svg" :width="width ?? 50" />
</template>
