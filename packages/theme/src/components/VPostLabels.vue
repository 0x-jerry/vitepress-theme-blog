<script lang="ts" setup>
import DateIcon from '~icons/carbon/calendar'
import TimeIcon from '~icons/carbon/time'
import type { ReadTimeResults } from 'reading-time'
import dayjs, { Dayjs } from 'dayjs'
import { computed } from 'vue'
import { useI18n } from '@@/lib/i18n'

const props = defineProps<{
  read?: ReadTimeResults
  date?: string | Date | Dayjs
  tags?: string[]
}>()

const { t } = useI18n()

const releaseDate = computed(() => dayjs(props.date).format('YYYY-MM-DD HH:mm'))
const readEstimate = computed(() => Math.ceil(props.read?.minutes || 0) + ' ' + t('time.minutes'))
</script>

<template>
  <div text="gray-400 xs" flex="~ wrap" grid="gap-2">
    <v-tag v-if="date" :icon="DateIcon" :content="releaseDate" />
    <v-tag :icon="TimeIcon" :content="readEstimate" />

    <v-link theme="text" :href="`/tag/${o}`" v-for="o in tags || []" :key="o">
      <v-tag :content="o" />
    </v-link>
  </div>
</template>

<style></style>
