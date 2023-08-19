<script lang="ts" setup>
import DateIcon from '~icons/carbon/calendar'
import TimeIcon from '~icons/carbon/time'
import type { ReadTimeResults } from 'reading-time'
import dayjs, { type Dayjs } from 'dayjs'
import { computed } from 'vue'
import { useI18n } from '@@/lib/i18n'
import VTag from './VTag.vue'
import VLink from './VLink.vue'

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
  <div class="text-(gray-400 xs) flex-(~ wrap) grid-(gap-2)">
    <VTag v-if="date" :icon="DateIcon" :content="releaseDate" />
    <VTag :icon="TimeIcon" :content="readEstimate" />

    <VLink theme="text" :href="`/tag/${o}`" v-for="o in tags || []" :key="o">
      <VTag :content="o" />
    </VLink>
  </div>
</template>

<style></style>
