<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { computed } from 'vue'
import ArrowUpBoldCircle from '~icons/mdi/arrow-up-bold-circle'

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

<template>
  <div class="fixed right-0 bottom-0 transition-transform z-50" :style="iconStyle" @click="go2top">
    <span class="circle-bg">
      <arrow-up-bold-circle class="relative z-10" />
    </span>
  </div>
</template>

<style scoped>
.circle-bg {
  @apply cursor-pointer relative text-3xl text-gray-4;
  @apply hover:text-gray-6 transition transition-colors bg-white;
  @apply rounded-full p-1 flex justify-center items-center;
}
</style>
