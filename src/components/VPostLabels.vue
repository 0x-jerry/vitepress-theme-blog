<script lang="ts" setup>
import DateIcon from '~icons/carbon/calendar'
import TimeIcon from '~icons/carbon/time'
import type { ReadTimeResults } from 'reading-time'
import dayjs, { Dayjs } from 'dayjs'
import { computed } from 'vue'

const props = defineProps<{
  read: ReadTimeResults
  date?: string | Dayjs
  tags?: string[]
}>()

const releaseDate = computed(() => dayjs(props.date).format('YYYY-MM-DD HH:mm'))
</script>

<template>
  <div text="gray-400 xs" flex="~ wrap" grid="gap-2">
    <v-tag v-if="date" :icon="DateIcon" :content="releaseDate" />
    <v-tag :icon="TimeIcon" :content="read.text" />

    <v-link theme="text" :href="`/tag/${o}`" v-for="o in tags || []" :key="o">
      <v-tag :content="o" />
    </v-link>
  </div>
</template>

<style></style>
