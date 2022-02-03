<script lang="ts" setup>
import { computed, reactive, watchEffect } from 'vue'

const props = defineProps<{
  color: string
  radius: number
  percent: number
  stroke: number
}>()

const data = reactive({
  normalizedRadius: 0,
  circumference: 0,
})

watchEffect(() => {
  data.normalizedRadius = props.radius - props.stroke * 2
  data.circumference = data.normalizedRadius * 2 * Math.PI
})

const strokeDashoffset = computed(
  () => data.circumference - (props.percent / 100) * data.circumference,
)
</script>

<template>
  <svg :height="radius * 2" :width="radius * 2" class="transform rotate-90">
    <circle
      :stroke="color"
      fill="transparent"
      :stroke-dasharray="data.circumference + ' ' + data.circumference"
      :style="{ strokeDashoffset }"
      :stroke-width="stroke"
      :r="data.normalizedRadius"
      :cx="radius"
      :cy="radius"
    />
  </svg>
</template>

<style></style>
