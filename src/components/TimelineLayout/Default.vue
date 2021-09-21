<script lang="ts" setup>
import { TimelineOption } from './typing'

defineProps<{ info: TimelineOption }>()
</script>

<template>
  <div class="v-timeline-layout-default">
    {{ info.title }}
  </div>
</template>

<style></style>
