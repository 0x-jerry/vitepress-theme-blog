<script lang="ts" setup>
import { CSSProperties, computed } from 'vue'

export type IframeData = string

const props = withDefaults(
  defineProps<{
    type?: 'iframe'
    data: IframeData
    width?: number | string
    height?: number | string
    aspect?: string
  }>(),
  {
    type: 'iframe',
    width: '100%',
    aspect: '16/9'
  }
)

const style = computed(() => {
  const s: CSSProperties = {
    aspectRatio: props.aspect,
    width: props.width,
    height: props.height
  }

  return s
})
</script>

<template>
  <iframe :src="data" :style="style" frameborder="0"></iframe>
</template>

<style lang="less" scoped></style>
