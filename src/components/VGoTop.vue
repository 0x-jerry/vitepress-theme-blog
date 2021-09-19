<template>
  <div class="fixed right-0 bottom-0 transition-transform z-50" :style="iconStyle" @click="go2top">
    <span class="cursor-pointer" text="3xl gray-400 hover:gray-900" transition="~ colors">
      <mdi:arrow-up-bold-circle />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'

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
</script>
