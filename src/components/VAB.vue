<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  choose?: string
  weight?: Record<string, number>
}>()

function getWinner(weight: Record<string, number>) {
  const weights = Object.keys(weight).map((key) => ({
    key,
    weight: weight[key],
  }))

  const weightSum = weights.reduce((sum, cur) => sum + cur.weight, 0)

  const targetWeight = weightSum * Math.random()

  let currentWeight = 0

  for (const target of weights) {
    if (targetWeight >= currentWeight && targetWeight < currentWeight + target.weight) {
      return target.key
    } else {
      currentWeight += target.weight
    }
  }

  return weights[0].key
}

const slotName = computed(() => {
  if (props.choose) return props.choose

  return getWinner(props.weight || {})
})
</script>

<template>
  <slot :name="slotName"></slot>
</template>
