<template>
  <div class="fixed right-0 bottom-0 transition-transform z-50" :style="iconStyle" @click="go2top">
    <span
      class="cursor-pointer relative"
      text="3xl gray-400 hover:gray-900"
      transition="~ colors"
      bg="white"
      border="rounded-full"
      p="1"
      flex="~"
      justify="center"
      align="items-center"
    >
      <div class="absolute top-1/2 left-1/2" transform="~ -translate-y-1/2 -translate-x-1/2">
        <v-circle color="#777" :radius="circleWidth" :stroke="2" :percent="percent" />
      </div>
      <mdi:arrow-up-bold-circle class="relative" z="10" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'
import { breakpoints } from '~/logic'

function go2top() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const pos = useWindowScroll()

const iconStyle = computed(() => {
  const r = pos.y.value > 100 ? '-3rem' : '3rem'

  return `transform: translate(-2rem, ${r})`
})

const percent = computed(() => {
  if (import.meta.env.SSR) return 0

  const h = document.scrollingElement!.scrollHeight - window.innerHeight

  const t = pos.y.value

  return (t / h) * 100
})

const circleWidth = computed(() => (breakpoints.greater('md').value ? 26 : 22))
</script>
