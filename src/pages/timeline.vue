<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { TimelineOption } from '~/components/TimelineLayout/typing'

const { t } = useI18n()

useHead({
  title: `${t('name')}'s Timeline`,
})

const events: TimelineOption[] = [
  {
    title: 'Timeline',
    start: dayjs('2021-07-01').toDate(),
  },
  {
    title: 'Timeline',
    start: dayjs('2021-07-01').toDate(),
    end: dayjs('2021-07-01').toDate(),
  },
  {
    title: 'Timeline',
    start: dayjs('2021-07-01').toDate(),
  },
  {
    title: 'Timeline',
    start: dayjs('2021-07-01').toDate(),
  },
  {
    title: 'Timeline',
    start: dayjs('2021-07-01').toDate(),
  },
]
</script>

<template>
  <div class="timeline">
    <h1 text="center xl" m="t-4" font="mono">Working In Progress.</h1>
    <v-timeline :events="events" />
  </div>
</template>

<style></style>
