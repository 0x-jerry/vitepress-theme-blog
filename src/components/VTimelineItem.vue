<script lang="ts" setup>
import { HeadObject } from '@vueuse/head'
import dayjs from 'dayjs'
import { computed } from 'vue'

interface TimelineItemProps {
  title: string
  start: string
  end?: string
  meta?: HeadObject[]
}

const props = defineProps<TimelineItemProps>()

const date = computed(() => {
  const start = dayjs(props.start).format('YYYY-MM-DD')

  if (!props.end) {
    return start
  }

  const end = dayjs(props.end).format('YYYY-MM-DD')
  return `${start} --- ${end}`
})
</script>

<template>
  <div class="v-timeline-item relative">
    <div
      class="v-timeline-anchor absolute top-0 left-0"
      flex="~"
      w="min-content"
      h="min-content"
      transform="~ -translate-x-1/2 -translate-y-1/2"
      bg="white"
      p="1"
      border="rounded-full"
      z="10"
    >
      <mdi:circle-double />
      <!-- <mdi:circle-slice-8 /> -->
    </div>
    <div
      class="v-timeline-line absolute top-0 left-0"
      transform="~ -translate-x-1/2"
      w="3px"
      h="full"
      bg="black"
      border="rounded-full"
    ></div>
    <div
      class="v-timeline-header absolute top-0 left-0"
      p="l-5"
      transform="~ -translate-y-1/2"
      flex="~"
      align="items-center"
    >
      <small text="gray-400">{{ date }}</small>
    </div>
    <div class="v-timeline-content" p="5">
      <v-card p="5">
        <h1 text="lg">{{ title }}</h1>
        <hr m="y-3" />
        <div class="heti heti--classic" text="gray-500">
          <slot></slot>
        </div>
      </v-card>
    </div>
  </div>
</template>

<style></style>
