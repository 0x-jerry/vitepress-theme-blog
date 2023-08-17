<script lang="ts" setup>
import type { Component } from 'vue'

defineProps<{ events: Component[] }>()
</script>

<template>
  <div class="v-timeline" p="y-5" m="t-4">
    <component v-for="o in events" :is="o" />
  </div>
</template>

<style></style>
