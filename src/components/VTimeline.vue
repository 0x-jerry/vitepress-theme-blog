<script lang="ts" setup>
import { TimelineOption } from './TimelineLayout/typing'

defineProps<{ events: TimelineOption[] }>()
</script>

<template>
  <div class="v-timeline" p="y-5" m="t-4">
    <v-timeline-item v-for="o in events" :info="o" />
  </div>
</template>

<style></style>
