<script lang="ts" setup>
const isClient = !import.meta.env.SSR
</script>
<template>
  <slot v-if="isClient"></slot>
</template>
