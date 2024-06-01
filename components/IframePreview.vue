<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useElementSize } from '@vueuse/core'

export interface IFramePreviewProps {
  title: string
  url: string
}

defineProps<IFramePreviewProps>()

const iframeSize = {
  w: 1920,
  h: 1080
}

const container = ref()

const containerSize = useElementSize(container)

const scale = computed(() => {
  const sw = containerSize.width.value / iframeSize.w

  const sh = containerSize.height.value / iframeSize.h

  return Math.min(sw, sh)
})

const iframeStyle = computed(() => {
  return {
    transform: `scale(${scale.value})`,
    transformOrigin: 'top left'
  }
})
</script>

<template>
  <div class="relative mb-12" ref="container">
    <iframe
      :src="url"
      frameborder="0"
      class="absolute border-(1 solid bGray-2)"
      :width="iframeSize.w"
      :height="iframeSize.h"
      :style="iframeStyle"
    ></iframe>

    <div class="iframe-link">
      <a :href="url" target="_blank">
        {{ title }}
      </a>
    </div>
  </div>
</template>

<style lang="less" scoped>
.iframe-link {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  transform: translateY(calc(100% + 8px));

  a {
    @apply text-bGray-4 hover:text-bPrimary-5;
  }
}
</style>
