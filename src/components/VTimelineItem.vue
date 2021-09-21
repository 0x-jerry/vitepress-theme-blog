<script lang="ts" setup>
import dayjs from 'dayjs'
import { computed } from 'vue'
import { TimelineOption } from './TimelineLayout/typing'

const layouts = import.meta.globEager('./TimelineLayout/*.vue')

console.log(layouts)

const layoutComponents: any = {}

for (const key in layouts) {
  layoutComponents[key.replace('./TimelineLayout/', '').slice(0, -4).toLowerCase()] =
    layouts[key].default
}

console.log(layoutComponents)

const props = defineProps<{ info: TimelineOption }>()

const layout = computed(() => {
  const layout = props.info.layout || 'default'

  const layoutName = layout in layoutComponents ? layout : 'default'

  return layoutComponents[layoutName]
})

const date = computed(() => {
  const start = dayjs(props.info.start).format('YYYY-MM-DD')

  if (!props.info.end) {
    return start
  }

  const end = dayjs(props.info.end).format('YYYY-MM-DD')
  return `${start} - ${end}`
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
      <mdi:circle-slice-8 />
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
      <span m="r-2">{{ info.title }}</span>
      <small text="gray-400">( {{ date }} )</small>
    </div>
    <div class="v-timeline-content" p="5">
      <component :is="layout" :info="info" />
    </div>
  </div>
</template>

<style></style>
